import { useState } from 'react'
import ProductItem from './ProductItem'

function ProductList({ products, onEdit, onDelete, onToggleStatus }) {
  const [sortBy, setSortBy] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  // Sắp xếp và lọc sản phẩm
  const getSortedAndFilteredProducts = () => {
    let filteredProducts = products

    // Lọc theo trạng thái
    if (filterStatus) {
      filteredProducts = products.filter(product => product.status === filterStatus)
    }

    // Sắp xếp
    if (sortBy === 'price-asc') {
      filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name') {
      filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name))
    } 

    return filteredProducts
  }

  const displayProducts = getSortedAndFilteredProducts()

  return (
    <div className="card">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">Danh Sách Sản Phẩm</h5>
      </div>
      
      <div className="card-body">
        {/* Bộ lọc và sắp xếp */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Sắp xếp theo:</label>
            <select 
              className="form-select form-select-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">-- Chọn cách sắp xếp --</option>
              <option value="name">Tên sản phẩm (A-Z)</option>
              <option value="price-asc">Giá (Thấp đến Cao)</option>
              <option value="price-desc">Giá (Cao đến Thấp)</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Lọc theo trạng thái:</label>
            <select 
              className="form-select form-select-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">-- Tất cả --</option>
              <option value="Còn hàng">Còn hàng</option>
              <option value="Hết hàng">Hết hàng</option>
            </select>
          </div>
        </div>

        {/* Danh sách sản phẩm dạng list */}
        {displayProducts.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted">Chưa có sản phẩm nào</p>
          </div>
        ) : (
          <div className="list-group list-group-flush">
            {displayProducts.map((product, index) => (
              <div key={product.id}>
                <ProductItem
                  product={product}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggleStatus={onToggleStatus}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList