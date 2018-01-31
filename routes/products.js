const express = require("express");
const router = new express.Router({ mergeParams: true });
const { Product, Store } = require("../models");

//   http://localhost:3001/api/products
router.route("").get((req, res, next) => {
  return Product.find({})
    .populate("stores")
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

module.exports = router;

let tempData = [
  {
    item: {
      category: "Hand Brace",
      partNumber: "hik1021",
      title: "Hand Brace Strap Shoulder Support Brace",
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
      category: "HFoot",
      partNumber: "hik1024",
      title: "HFoot Strap Shoulder Support Brace",
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
