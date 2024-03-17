
import OrderBody from "./order-comp/OrderBody";
import OrderCart from "./order-comp/OrderCart"
const Order = () => {
  return (
    <div className="page-template">
        <div className="grid grid-rows-1 lg:grid-rows-1 grid-cols-1 lg:grid-cols-3 py-4 px-8">

          <div className="col-start-1 col-end-3">
            <OrderBody/>
          </div> 

          <div className="mx-4">
            <OrderCart />
          </div>
        </div>
    </div>
  )
}

export default Order