
import { useFormik } from 'formik';
import userRegistrationSchema from './userRegistrationSchema'; // <-- 1. Import schema Yup

function FormikWithYup() {
    const formik = useFormik({
        initialValues: { name: '', email: '', password: '' },
        validationSchema: userRegistrationSchema, // <-- 2. Tích hợp schema Yup vào validationSchema
        onSubmit: (values) => { /* Xử lý dữ liệu form */ }, 
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            {/* <-- 3. thuộc tính 'name' (name="name") liên kết input với trường 'name' trong Yup schema */}
            <input name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
            {/* <-- 4. formik.errors chứa thông báo lỗi từ Yup */}
            {/* <-- 5. Hiển thị thông báo lỗi từ Yup khi trường đã được chạm vào */}
            {formik.touched.name && formik.errors.name && (
                <p>{formik.errors.name}</p>
            )}         
            <button type="submit">Submit</button>
        </form>
    );
}



