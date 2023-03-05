import { Select } from '@mantine/core';
function Category(props) {
    const { categoryvalue, categories, postData, setPostdata } = props
    return (
        <Select
        label="Select a category to submit your post to"
        categoryvalue={categoryvalue}
        placeholder="Pick one"
        data={categories.map((category) => ({
            value: category._id,
            label: category.name
        }))}
        onChange={(categoryvalue) => setPostdata({ ...postData, category_id: categoryvalue})}
        withAsterisk
        />    
    )
}

export default Category;