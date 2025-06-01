import { useState } from 'react'
import { validateProduct, hasErrors } from '../utils/validation'

function ProductForm({ onAddProduct, onUpdateProduct, editingProduct, onCancelEdit }) {
  const [formData, setFormData] = useState({
    name: editingProduct?.name || '',
    description: editingProduct?.description || '',
    price: editingProduct?.price?.toString() || '',
    status: editingProduct?.status || 'Còn hàng'
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const validationErrors = validateProduct(formData)
    setErrors(validationErrors)
    return !hasErrors(validationErrors)
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const productData = {
      ...formData,
      price: parseFloat(formData.price)
    }
    
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, productData)
    } else {
      onAddProduct(productData)
    }
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      price: '',
      status: 'Còn hàng'
    })
    setErrors({})
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <div className="card">
      <div className="card-header bg-success text-white">
        <h5 className="mb-0">
          {editingProduct ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tên Sản Phẩm</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nhập tên sản phẩm"
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Mô Tả</label>
            <textarea
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Nhập mô tả sản phẩm"
              rows="3"
            />
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Giá</label>
            <input
              type="number"
              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Nhập giá sản phẩm"
            />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Trạng Thái</label>
            <select
              className="form-select"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Còn hàng">Còn hàng</option>
              <option value="Hết hàng">Hết hàng</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100 mb-2">
            {editingProduct ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm'}
          </button>
          
          {editingProduct && (
            <button type="button" className="btn btn-secondary w-100" onClick={onCancelEdit}>
              Hủy
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default ProductForm