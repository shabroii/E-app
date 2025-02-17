const AdminPanel = ({ product, onEdit, onDelete, index }) => {
    return (
      <div className="border p-4 rounded-2xl shadow-lg bg-white w-full">
        {/* Product Image */}
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-60 object-cover rounded"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No Image</p>
          </div>
        )}
  
        {/* Product Info */}
        <h3 className="text-lg text-green-400 font-bold mt-2">{product.name}</h3>
        <p className="text-slate-500">Category: {product.category}</p>
        <p className="text-slate-700">Price: {product.price} EGP</p>
  
        {/* Action Buttons */}
        <div className="flex justify-around mt-2">
          <button 
            className="bg-blue-500 text-white hover:bg-blue-700 px-6 py-1 rounded"
            onClick={() => onEdit(index)}
          >
            Edit
          </button>
          <button 
            className="bg-red-600 text-white hover:bg-red-700 px-4 py-1 rounded"
            onClick={() => onDelete(index)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };
  
  export default AdminPanel;
  
  
    