import { Link } from "react-router-dom";


const AppNavbar = ({products,  carts, setToken}) => { 
    return ( 
        <div className="d-flex justify-content-center gap-2 nav">
            <Link to={'home'}> <button>Home</button></Link>
            <Link to={'calculator'}> <button>Calculator</button> </Link>
            <Link to={'animation'}> <button>Animation</button></Link>
            <Link to={'components'}> <button>Components</button></Link>
            <Link to={'Todos'}> <button>Todos</button></Link>
            <Link to={'Products'}> <button>Product({products.length})</button></Link>
            <Link to={'Carts'}> <button>Carts({carts.length})</button></Link>
             <Link to={'Logout'}> <button className=" btn btn-danger" onClick={() => {setToken('')}}>Logout</button></Link>
        </div>
    );
}
 
export default AppNavbar;