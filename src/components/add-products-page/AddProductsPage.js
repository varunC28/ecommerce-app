import React, { useState ,useEffect} from "react";
import { useLocation, useNavigate,useParams  } from "react-router-dom";
import Creatable from 'react-select/creatable';
import axios from 'axios';


import "./AddProductsPage.css";
import {useAuth }  from '../../contexts/AuthContext';

function AddProductsPage({ isModifyPage}) {
  
  const ecommerceurl = "http://localhost:8080/api/products";
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const [setData, setSetData] = useState(new Set());

  const [formData, setFormData] = useState({
    id:'',
    name: '',
    category: '',
    manufacturer: '',
    availableItems: '',
    price: '',
    imageUrl:'',
    description:'',
  });

  const {authUser, 
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    isAdmin,
    setIsAdmin
  } = useAuth();
  const { id } = useParams();
  console.log("11");
  console.log("productId=="+id);
  console.log("isModifyPage=="+isModifyPage);
  


 
  

  useEffect(() => {
    axios.get(ecommerceurl+'/categories')
      .then(response => {
        // Assuming your server returns data in an array format
        // Modify this according to your actual API response structure
        const formattedOptions = response.data.map(item => ({
          value: item,
          label: item
        }));
        console.log(formattedOptions);
        setOptions(formattedOptions);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures useEffect only runs once on component mount

const handleCategory = (newValue, actionMeta) => {
  setSelectedOption(newValue);
  console.log('Option selected:', newValue);
};

 const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateOption = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setOptions([...options, newOption]); // Update options state with new option
    setSelectedOption(newOption); // Optionally select the newly created option
    console.log('Option created:', newOption);
  };

  useEffect(() => {
    
    if(id !=null && isModifyPage==true) {
      console.log("22");
      axios.get(ecommerceurl+"/"+id)
      .then(response => {
        console.log("33");
        const productDetails = response.data;
        console.log(productDetails);
        //setFormData("name",productDetails.name);
        setFormData({
          ["id"]:productDetails.id,
          ["name"]:productDetails.name,
          
          ["manufacturer"]:productDetails.manufacturer,
          ["availableItems"]:productDetails.availableItems,
          ["price"]:productDetails.price,
          ["imageUrl"]:productDetails.imageUrl,
          ["description"]:productDetails.description,
           

        });
        console.log(productDetails.category);
        //setIsLoading(true);

        const newOption = { value: productDetails.category, label: productDetails.category };
    
        setSelectedOption(newOption);
       
         
        console.log(selectedOption);
        
        
      })
    }
  },[]);


  const handleModifyProduct=async () =>{
    const auth = "Bearer "+ authUser["USERTOKEN"];
    try {
      const response = await fetch(ecommerceurl+"/"+formData.id, {
        
        method: "PUT",
        headers: {
          "Content-Type": "application/json",

          "Authorization": auth,

        },
        body: JSON.stringify({
	        name: formData.name,
          category: selectedOption.value,
          manufacturer: formData.manufacturer,
          availableItems: parseInt(formData.availableItems),
          price: parseFloat(formData.price),
          imageUrl:formData.imageUrl,
          description:formData.description, 	
      
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      
      //const data = await response.json();
      setSuccessMessage(`Product ${formData.name} ${isModifyPage ? 'modified' : 'added'} successfully`);
    } catch (error) {
      alert(error);
    }
  }
  const handleAddProduct = async () => {
    //const auth = "Bearer "+ localStorage.getItem("USERTOKEN");
    //console.log(auth);
    
    const auth = "Bearer "+ authUser["USERTOKEN"];
    try {
      const response = await fetch(ecommerceurl, {
        
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          "Authorization": auth,

        },
        body: JSON.stringify({
	        name: formData.name,
          category: selectedOption.value,
          manufacturer: formData.manufacturer,
          availableItems: parseInt(formData.availableItems),
          price: parseFloat(formData.price),
          imageUrl:formData.imageUrl,
          description:formData.description, 	
      
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      
      //const data = await response.json();
      setSuccessMessage(`Product ${formData.name} ${isModifyPage ? 'modified' : 'added'} successfully`);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="add-products-container">
      <div className="heading-container">
        <h1>{isModifyPage ? 'Modify Product' : 'Add Product'}</h1>
      </div>

      <form id="productform">
        <div className="form-container">
        <input type="text" name="name" placeholder="Product Name *"  required value={formData.name} onChange={handleChange} />
        <Creatable name="category"
         options={options}
         isLoading={isLoading}
         value={selectedOption}
         onChange={handleCategory}
         onCreateOption={handleCreateOption}
        placeholder="Select Category *"
      />
       <input type="text" name="manufacturer" placeholder="Manufacturer *" required value={formData.manufacturer} onChange={handleChange} />
       < input type="number" name="availableItems" placeholder="Available Quantity *" required value={formData.availableItems} onChange={handleChange} />
       <input type="number" name="price" placeholder="Price *" required value={formData.price} onChange={handleChange} />
       <input type="text" name="imageUrl" placeholder="Image URL *" required value={formData.imageUrl} onChange={handleChange} />
       <input type="text" name="description" placeholder="Description *" required value={formData.description} onChange={handleChange} />
   
       {!isModifyPage && (
        <>
          <button type="button" onClick={handleAddProduct}>{'SAVE PRODUCT'}</button>
        </> 
         )}
      {isModifyPage && (
        <>
          <button type="button" onClick={handleModifyProduct}>{'UPDATE PRODUCT'}</button>
        </> 
         )}
        </div>
      </form>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default AddProductsPage;
