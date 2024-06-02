import productModel from "../models/productModel.js";
import slugify from "slugify"
import orderModel from "../models/orderModel.js";
import Stripe from 'stripe';
import dotenv from "dotenv";
import categoryModel from "../models/categoryModel.js";
dotenv.config();


const addProduct = async (req, res) => {

    const { name, description, price, category, quantity, shipping, photo } =
      req.body;
    // validation
    switch (true) {
      case !name:
        return res.status(401).json({
          success: false,
          message: "Name is required",
        });
      case !description:
        return res.status(401).json({
          success: false,
          message: "Description is required",
        });
      case !price:
        return res.status(401).json({
          success: false,
          message: "Price is required",
        });
      case !category:
        return res.status(401).json({
          success: false,
          message: "Category is Required",
        });
      case !quantity:
        return res.status(401).json({
          success: false,
          message: "Quantity is required",
        });
      case !photo:
        return res.status(401).json({
          success: false,
          message: "Photo is required",
        });
    }
    const newProduct = new productModel({
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      photo,
      slug: slugify(name)
    });
     await newProduct.save();
     return res.status(201).json({success:true,message:"Product created Successfully",newProduct})
};
 const getProductController = async (req, res) => {
  try {
    const page= req.query.page? parseInt(req.query.page): 1;
    const size =req.query.size? parseInt(req.query.size):10;
    const skip = (page-1)*size;   
    const productCount = await productModel.find({});
   
    const products = await productModel
      .find({}).skip(skip).limit(size)
      .populate("category")
    res.status(200).send({
      success: true,
      count:productCount.length,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

 const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      
    res.status(200).send({
      success: true,
      message: "success",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

 const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, photo } = req.body;
    //alidation
    switch (true) {
      case !name:
        return res.status(401).json({
          success: false,
          message: "Name is required",
        });
      case !description:
        return res.status(401).json({
          success: false,
          message: "Description is required",
        });
      case !price:
        return res.status(401).json({
          success: false,
          message: "Price is required",
        });
      
      case !quantity:
        return res.status(401).json({
          success: false,
          message: "Quantity is required",
        });
     
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, slug: slugify(name) },
      { new: true }
    );
   
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }

};
const stripe = new Stripe(process.env.SRIPE_KEY, {
  apiVersion: '2020-08-27',
});

const stripeController =async(req,res)=>{
 

  try {
    const { amount, currency, paymentMethodId } = req.body;

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirm: true,
    });

    // Handle success
    res.status(200).json({ message: 'Payment successful', paymentIntent });
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({ error: 'Payment failed' });
  }
}


// search product
 const searchProductController = async (req, res) => {
  try{
    const query = req.query.q 

    const regex = new RegExp(query,'i','g')

    const product = await productModel.find({
        "$or" : [
            {
                name : regex
            },
            {
                description : regex
            }
        ]
    })


    res.json({
        data  : product ,
        message : "Search Product list",
        error : false,
        success : true
    })
}catch(err){
    res.json({
        message : err.message || err,
        error : true,
        success : false
    })
}
};
// similar products
 const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .populate("category");






      
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};
// get products by catgory
const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

const getAllproducts = async(req,res)=>{
    try {
      const data = await productModel.find({});
    res.status(200).json({
      success:true,
      message:"Success",
      data
    })
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        error,
        message: "Error While Getting products",
      });
    }
}

export {addProduct,getProductController,searchProductController,realtedProductController,getAllproducts,getSingleProductController,deleteProductController,updateProductController,productCategoryController,stripeController,}