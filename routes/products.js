const express = require("express");
const router = new express.Router({ mergeParams: true });
const { Product, Store } = require("../models");

//   http://localhost:3001/api/products

router.route("/").get((req, res, next) => {
  return Product.find({})
    .select("-_id -__v -createdAt -updatedAt")
    .populate({
      path: "stores",
      select: "-__v -_id"
    })
    .exec()
    .then(data => {
      res.send(
        Object.assign(
          {},
          { products: data },
          {
            categories: [
              "Clavicle",
              "Hand Brace",
              "Sleeping Hand Brace",
              "Ankle",
              "Foot",
              "Lumbar"
            ]
          }
        )
      );
    });
});

router.route("/clear-all").get((req, res, next) => {
  Product.remove({})
    .then(newItem => {
      return Product.find().then(product => {
        return res.send(product);
      });
    })
    .catch(err => {
      console.log("Error creating", err);
    });

  Store.remove({})
    .then(newItem => {
      return Product.find().then(product => {
        return res.send(product);
      });
    })
    .catch(err => {
      console.log("Error creating", err);
    });
});

router.route("/populate").get((req, res, next) => {
  tempData.forEach(prod => {
    let { store } = prod;

    Product.create(prod.item).then(newItem => {
      const itemId = newItem._id;

      prod.stores.forEach(store => {
        Store.create(store).then(newStore => {
          newStore.product = itemId;

          Product.findByIdAndUpdate(itemId, {
            $addToSet: { stores: newStore._id }
          }).then(data => res.redirect("/api/products"));
        });
      });
    });
  });
});

router.route("/:item").get((req, res, next) => {
  return Product.find({ partNumber: req.params.item })
    .select("-_id -__v -createdAt -updatedAt")
    .populate({
      path: "stores",
      select: "-__v -_id"
    })
    .exec()
    .then(data => {
      res.send({ products: data });
    });
});

module.exports = router;

let tempData = [
  {
    item: {
      category: "Clavicle",
      partNumber: "hik1021",
      title: "Clavicle Strap Shoulder Support Brace",
      description: 'Engineering designed to help prevent shoulder slump and minimize movement while treating clavicular fractures. \n Foam padded hoop and loop closure straps provide proper fit and maintain even support. \n Features positional D-rings for proper adjustment. \nIdeal for people with extended use of a computer.\n Engineering designed to help prevent shoulder slump and minimize movement while treating clavicular fractures.\nFoam padded hoop and loop closure straps provide proper fit and maintain even support.\n Features positional D-rings for proper adjustment.\n Ideal for people with extended use of a computer.\n Engineering designed to help prevent shoulder slump and minimize movement while treating clavicular fractures.\n Foam padded hoop and loop closure straps provide proper fit and maintain even support.\n Features positional D-rings for proper adjustment.\n Ideal for people with extended use of a computer.\nEngineering designed to help prevent shoulder slump and minimize movement while treating clavicular fractures.\n Foam padded hoop and loop closure straps provide proper fit and maintain even support.\nFeatures positional D-rings for proper adjustment.\nlast Ideal for people with extended use of a computer.',
      images: "https://i.ebayimg.com/images/g/hnwAAOSw~oFXI~Yj/s-l1600.jpg"
    },
    stores: [
      {
        name: "Amazon",
        size: "Small",
        price: 1,
        url: "http://amazon.com"
      },
      {
        name: "ebay",
        size: "Small",
        price: 2,
        url: "http://amazon.com"
      },
      ,
      {
        name: "ebay",
        size: "Medium",
        price: 2.5,
        url: "http://amazon.com"
      }
    ]
  },
  {
    item: {
      category: "Clavicle",
      partNumber: "hik1022",
      title: "Clavicle  Strap Shoulder Support Brace",
      description: 'Engineering designed to help prevent shoulder slump and minimize movement while treating clavicular fractures. \n Foam padded hoop and loop closure straps provide proper fit and maintain even support. \n Features positional D-rings for proper adjustment. \nIdeal for people with extended use of a computer.\n Engineering designed to help prevent shoulder slump and minimize movement while treating clavicular fractures.\nFoam padded hoop and loop closure straps provide proper fit and maintain even support.\n Features positional D-rings for proper adjustment.\n Ideal for people with extended use of a computer.\n Engineering designed to help prevent shoulder slump and minimize movement while treating clavicular fractures.\n Foam padded hoop and loop closure straps provide proper fit and maintain even support.\n Features positional D-rings for proper adjustment.\n Ideal for people with extended use of a computer.\nEngineering designed to help prevent shoulder slump and minimize movement while treating clavicular fractures.\n Foam padded hoop and loop closure straps provide proper fit and maintain even support.\nFeatures positional D-rings for proper adjustment.\nlast Ideal for people with extended use of a computer.',
      images: "https://i.ebayimg.com/images/g/hnwAAOSw~oFXI~Yj/s-l1600.jpg"
    },
    stores: [
      {
        name: "Amazon",
        size: "Small",
        price: 3.2,
        url: "http://amazon.com"
      },
      {
        name: "ebay",
        size: "Small",
        price: 3.9999,
        url: "http://amazon.com"
      }
    ]
  },
  {
    item: {
      category: "Wrist",
      partNumber: "hik1023",
      title: "Wrist Strap Shoulder Support Brace",
      description: 'Engineering designed to help prevent shoulder slump and minimize movement while treating clavicular fractures. \n Foam padded hoop and loop closure straps provide proper fit and maintain even support. \n Features positional D-rings for proper adjustment. \nIdeal for people with extended use of a computer.\n Engineering designed to help prevent shoulder slump and minimize movement while treating clavicular fractures.\nFoam padded hoop and loop closure straps provide proper fit and maintain even support.\n Features positional D-rings for proper adjustment.\n Ideal for people with extended use of a computer.\n Engineering designed to help prevent shoulder slump and minimize movement while treating clavicular fractures.\n Foam padded hoop and loop closure straps provide proper fit and maintain even support.\n Features positional D-rings for proper adjustment.\n Ideal for people with extended use of a computer.\nEngineering designed to help prevent shoulder slump and minimize movement while treating clavicular fractures.\n Foam padded hoop and loop closure straps provide proper fit and maintain even support.\nFeatures positional D-rings for proper adjustment.\nlast Ideal for people with extended use of a computer.',
      images: "https://i.ebayimg.com/images/g/hnwAAOSw~oFXI~Yj/s-l1600.jpg"
    },
    stores: [
      {
        name: "Amazon",
        size: "Small",
        price: 5,
        url: "http://amazon.com"
      },
      {
        name: "ebay",
        size: "Small",
        price: 6,
        url: "http://amazon.com"
      }
    ]
  },
  {
    item: {
      category: "Foot",
      partNumber: "hik1024",
      title: "Foot Strap Shoulder Support Brace",
      description: 'Engineering designed to help prevent shoulder slump and minimize movement while treating clavicular fractures. \n Foam padded hoop and loop closure straps provide proper fit and maintain even support. \n Features positional D-rings for proper adjustment. \nIdeal for people with extended use of a computer.\n Engineering designed to help prevent shoulder slump and minimize movement while treating clavicular fractures.\nFoam padded hoop and loop closure straps provide proper fit and maintain even support.\n Features positional D-rings for proper adjustment.\n Ideal for people with extended use of a computer.\n Engineering designed to help prevent shoulder slump and minimize movement while treating clavicular fractures.\n Foam padded hoop and loop closure straps provide proper fit and maintain even support.\n Features positional D-rings for proper adjustment.\n Ideal for people with extended use of a computer.\nEngineering designed to help prevent shoulder slump and minimize movement while treating clavicular fractures.\n Foam padded hoop and loop closure straps provide proper fit and maintain even support.\nFeatures positional D-rings for proper adjustment.\nlast Ideal for people with extended use of a computer.',
      images: "https://i.ebayimg.com/images/g/hnwAAOSw~oFXI~Yj/s-l1600.jpg"
    },
    stores: [
      {
        name: "Amazon",
        size: "Small",
        price: 7,
        url: "http://amazon.com"
      },
      {
        name: "ebay",
        size: "Small",
        price: 8,
        url: "http://amazon.com"
      }
    ]
  },
  {
    item: {
      category: "Lumbar",
      partNumber: "hik1025",
      title: "Lumbar Strap Shoulder Support Brace",
      images: "https://i.ebayimg.com/images/g/hnwAAOSw~oFXI~Yj/s-l1600.jpg"
    },
    stores: [
      {
        name: "Amazon",
        size: "Small",
        price: 9,
        url: "http://amazon.com"
      },
      {
        name: "ebay",
        size: "Small",
        price: 10,
        url: "http://amazon.com"
      }
    ]
  },
  {
    item: {
      category: "Clavicle",
      partNumber: "hik1026",
      title: "Clavicle Strap Shoulder Support Brace",
      images: "https://i.ebayimg.com/images/g/hnwAAOSw~oFXI~Yj/s-l1600.jpg"
    },
    stores: [
      {
        name: "Amazon",
        size: "Small",
        price: 11,
        url: "http://amazon.com"
      },
      {
        name: "ebay",
        size: "Small",
        price: 12,
        url: "http://amazon.com"
      }
    ]
  },
  {
    item: {
      category: "Sleeping Hand Brace",
      partNumber: "hik1027",
      title: "Sleeping Hand Brace Strap Shoulder Support Brace",
      images: "https://i.ebayimg.com/images/g/hnwAAOSw~oFXI~Yj/s-l1600.jpg"
    },
    stores: [
      {
        name: "Amazon",
        size: "Small",
        price: 11,
        url: "http://amazon.com"
      },
      {
        name: "ebay",
        size: "Small",
        price: 12,
        url: "http://amazon.com"
      }
    ]
  },
  {
    item: {
      category: "Knee",
      partNumber: "hik1028",
      title: "Knee Strap Shoulder Support Brace",
      images: "https://i.ebayimg.com/images/g/hnwAAOSw~oFXI~Yj/s-l1600.jpg"
    },
    stores: [
      {
        name: "Amazon",
        size: "Small",
        price: 11,
        url: "http://amazon.com"
      },
      {
        name: "ebay",
        size: "Small",
        price: 12,
        url: "http://amazon.com"
      }
    ]
  },
  {
    item: {
      category: "Knee",
      partNumber: "hik1029",
      title: "Knee Strap Shoulder Support Brace",
      images: "https://i.ebayimg.com/images/g/hnwAAOSw~oFXI~Yj/s-l1600.jpg"
    },
    stores: [
      {
        name: "Amazon",
        size: "Small",
        price: 11,
        url: "http://amazon.com"
      },
      {
        name: "ebay",
        size: "Small",
        price: 12,
        url: "http://amazon.com"
      }
    ]
  }
];

// let tempData = [{
//     type: "Hand Brace",
//     partNumber: "hik1021",
//     title: "Hand Brace Strap Shoulder Support Brace",
//     ebayPrice: [12, 22],
//     ebayUrl: "http://ebay.com",
//     amazonPrice: [43,20],
//     amazonUrl: "http://amazon.com",
//     images: "https://i.ebayimg.com/images/g/hnwAAOSw~oFXI~Yj/s-l1600.jpg"
//   },
//   {
//     type: "Clavicle",
//     partNumber: "hik1023",
//     title: "Clavicle Strap Shoulder Support Brace",
//     ebayPrice: [42, 19],
//     ebayUrl: "http://ebay.com",
//     amazonPrice: [8, 20],
//     amazonUrl: "http://amazon.com",
//     images: "https://i.ebayimg.com/images/g/hnwAAOSw~oFXI~Yj/s-l1600.jpg"
//   },
//   {
//     type: "Sleeping Hand Brace",
//     partNumber: "hik1024",
//     title: "Sleeping Hand Brace Strap Shoulder Support Brace",
//     ebayPrice: [14, 2],
//     ebayUrl: "http://ebay.com",
//     amazonPrice: [75, 9],
//     amazonUrl: "http://amazon.com",
//     images: "https://i.ebayimg.com/images/g/hnwAAOSw~oFXI~Yj/s-l1600.jpg"
//   },
//   {
//     type: "Foot",
//     partNumber: "hik1025",
//     title: "Hand Brace Strap Shoulder Support Brace",
//     ebayPrice: [3, 12],
//     ebayUrl: "http://ebay.com",
//     amazonPrice: [43, 20],
//     amazonUrl: "http://amazon.com",
//     images: "https://i.ebayimg.com/images/g/hnwAAOSw~oFXI~Yj/s-l1600.jpg"
//   }]
