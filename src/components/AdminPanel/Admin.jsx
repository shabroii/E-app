import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import AdminPanel from "./AdminPanel";

const Admin = () => {


  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem("products")) || []);
  const [formData, setFormData] = useState({ name: "", category: "", image: "", price: "" });
  const [editIndex, setEditIndex] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFormData({ ...formData, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = formData;
      setProducts(updatedProducts);
    } else {
      setProducts([...products, formData]);
    }
    console.log("Submitted Data:", formData); 

    setFormData({ name: "", category: "", image: "", price: "" });
    setEditIndex(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEdit = (index) => {
    setFormData(products[index]);
    setEditIndex(index);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: "areYouSure",
      text: "deleteWarning",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts(products.filter((_, i) => i !== index));
        Swal.fire("Deleted Successfully", "success");
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <div className="flex flex-col items-center px-4">
        <h1 className="mt-5 font-bold text-3xl">Hello Admin</h1>
        <h3 className="my-6 text-lg">Manage your products</h3>

        <form className="w-full max-w-lg space-y-3" onSubmit={handleSubmit}>
          <div>
            <label>Product Title</label>
            <input type="text" name="name" placeholder="Product Title" value={formData.name} onChange={handleInputChange} className="border p-2 w-full rounded" required />
          </div>

          <div>
            <label>Category</label>
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} className="border p-2 w-full rounded" required />
          </div>

          <div>
            <label>Price</label>
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} className="border p-2 w-full rounded" required />
          </div>

          <div>
            <label>Upload Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="border p-2 w-full rounded" />
          </div>

          <button type="submit" className="mt-4 px-6 py-2.5 w-full bg-green-600 text-white rounded-lg">
            {editIndex !== null ? "Update Product" : "Add Product"}
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl mt-6">
          {products.map((product, index) => (
            <AdminPanel key={index} product={product} onEdit={() => handleEdit(index)} onDelete={() => handleDelete(index)} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Admin;