import { Field, ErrorMessage } from "formik";

export function Input({ name, children }) {

    return (<div class="mb-3 flex-fill">

        <div>{children}</div>
        <div class="row">
            <div class="col-6 flex-fill d-flex flex-column"> <Field name={name} class="rounded mr-2" /> </div>
            <div class="col-2 flex-fill"></div>
        </div>

        <ErrorMessage name={name} />
    </div>);
}
