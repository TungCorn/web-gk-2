function ProductItem({ product, onEdit, onDelete, onToggleStatus }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
  }

  return (
    <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
      <div className="flex-grow-1">
        <h6 className="mb-1 fw-bold">{product.name}</h6>
        <p className="mb-1 text-muted small">{product.description}</p>
        <div className="d-flex align-items-center gap-2">
          <span className="fw-bold">Giá: {formatPrice(product.price)}</span>
          <span className="small text-muted">Trạng thái: {product.status}</span>
        </div>
      </div>
      
      <div className="d-flex gap-1">
        <button 
          className={`btn btn-sm ${product.status === 'Còn hàng' ? 'btn-warning' : 'btn-success'}`}
          onClick={() => onToggleStatus(product.id)}
        >
          {product.status === 'Còn hàng' ? 'Đánh dấu Hết hàng' : 'Đánh dấu Còn hàng'}
        </button>
        <button 
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(product.id)}
        >
          Xóa
        </button>
      </div>
    </div>
  )
}

export default ProductItem