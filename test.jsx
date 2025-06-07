
<input id="name" type="text" {...formik.getFieldProps('name')} />
{formik.touched.name && formik.errors.name ? (
  <div style={{ color: 'red' }}>{formik.errors.name}</div>
) : null}

