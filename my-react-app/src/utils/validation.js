// Validation rules cho sản phẩm
export const validateProduct = (formData) => {
  const errors = {}
  
  // Validate tên sản phẩm
  if (!formData.name?.trim()) {
    errors.name = 'Tên sản phẩm không được để trống'
  } else if (formData.name.length > 30) {
    errors.name = 'Tên sản phẩm không được quá 30 ký tự'
  }
  
  // Validate mô tả
  if (!formData.description?.trim()) {
    errors.description = 'Mô tả không được để trống'
  }
  
  // Validate giá
  if (!formData.price) {
    errors.price = 'Giá không được để trống'
  } else if (parseFloat(formData.price) < 0) {
    errors.price = 'Giá không được âm'
  } else if (isNaN(parseFloat(formData.price))) {
    errors.price = 'Giá phải là số hợp lệ'
  }
  
  return errors
}

// Utility function để check có lỗi không
export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0
}