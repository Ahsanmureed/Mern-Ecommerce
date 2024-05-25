import orderModel from "../models/orderModel.js";

const createOrderController=  async (req, res) => {
  const { products, payment, buyer } = req.body;
  try {
    const order = new orderModel({ products, payment, buyer });
    await order.save();
    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const allOrderController =async(req,res)=>{
  try {
    const orders = await orderModel.find({}).populate('products').populate('buyer','-password')
    res.status(200).json({ message: 'Successfully fetched all orders',orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const userOrderController = async(req,res)=>{
try {
  
  const userOrder = await orderModel.find({buyer:req.params.id}).populate('buyer','-password').populate('products')
  res.status(200).json({ message: 'Successfully fetched all user orders',userOrder });
} catch (error) {
  res.status(500).json({ error: error.message });
}
}
const updateOrderController= async(req,res)=>{
const updateOrder = await orderModel.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
console.log(req.params.id);
updateOrder.save();
res.status(200).json({ message: 'Successfully Update order',updateOrder });
}
export {createOrderController,allOrderController,userOrderController,updateOrderController}