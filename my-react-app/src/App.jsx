import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import ConfirmModal from './components/ConfirmModal'
import './App.css'

function App() {
  // State cho danh sách sản phẩm
  const [products, setProducts] = useState([])
  
  // State cho chỉnh sửa sản phẩm
  const [editingProduct, setEditingProduct] = useState(null)
  
  // State cho modal xác nhận xóa
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    productId: null
  })

  // useEffect để load dữ liệu mẫu khi component mount
  useEffect(() => {
    const sampleProducts = [
      {
        id: 1,
        name: 'Áo Thun Nam',
        description: 'Áo thun chất liệu cotton, thoải tráng.',
        price: 250000,
        status: 'Còn hàng'
      },
      {
        id: 2,
        name: 'Giày Thể Thao',
        description: 'Giày thể thao cao cấp, phù hợp mọi hoạt động.',
        price: 850000,
        status: 'Hết hàng'
      }
    ]
    setProducts(sampleProducts)
  }, [])

  // Hàm thêm sản phẩm mới
  const handleAddProduct = (productData) => {
    const newProduct = {
      id: Date.now(), // Tạo ID duy nhất
      ...productData
    }
    setProducts(prevProducts => [...prevProducts, newProduct])
  }

  // Hàm cập nhật sản phẩm
  const handleUpdateProduct = (id, productData) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...productData, id } : product
      )
    )
    setEditingProduct(null)
  }

  // Hàm bắt đầu chỉnh sửa sản phẩm
  const handleEditProduct = (product) => {
    setEditingProduct(product)
  }

  // Hàm hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditingProduct(null)
  }

  // Hàm mở modal xác nhận xóa
  const handleDeleteProduct = (id) => {
    // setDeleteModal({
    //   isOpen: true,
    //   productId: id
    // })
    setProducts(prevProducts =>
      prevProducts.filter(product => product.id !==id)
    )
  }

  // Hàm xác nhận xóa sản phẩm
  const confirmDelete = () => {
    setProducts(prevProducts =>
      prevProducts.filter(product => product.id !== deleteModal.productId)
    )
    setDeleteModal({
      isOpen: false,
      productId: null
    })
  }

  // Hàm hủy xóa
  const cancelDelete = () => {
    setDeleteModal({
      isOpen: false,
      productId: null
    })
  }

  // Hàm thay đổi trạng thái sản phẩm
  const handleToggleStatus = (id) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id
          ? { ...product, status: product.status === 'Còn hàng' ? 'Hết hàng' : 'Còn hàng' }
          : product
      )
    )
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-primary">Quản Lý Sản Phẩm</h1>
      
      {/* Form thêm/sửa sản phẩm */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <ProductForm
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            editingProduct={editingProduct}
            onCancelEdit={handleCancelEdit}
          />
        </div>
      </div>
      
      <div className="row justify-content-center">
        <div className="col-md-8">
          <ProductList
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      </div>

      {/* Modal xác nhận xóa */}
      {/* <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Xác nhận xóa sản phẩm"
        message="Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      /> */}
    </div>
  )
}

export default App