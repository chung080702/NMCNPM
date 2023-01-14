import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"
import { Input } from "../../components/Input";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { ThemNhanKhau } from "../../components/themNhanKhau";
import { fetchAPI } from "../../untils/fetchAPI";
import { useNavigate } from "react-router-dom"

const SignupSchema = Yup.object().shape({
    // hoTenChuHo: Yup.string()
    //     .min(2, 'Too Short!')
    //     .max(70, 'Too Long!')
    //     .required('Required'),
    // cccdChuHo: Yup.string()
    //     .required('Required')
    //     .matches(/^[0-9]+$/, "Must be only digits")
    //     .min(12, 'Must be exactly 12 digits')
    //     .max(12, 'Must be exactly 12 digits'),
    // diaChi: Yup.string()
    //     .min(2, 'Too Short!')
    //     .max(70, 'Too Long!')
    //     .required('Required'),

});

function ThemHoKhau() {
    const [openModal, setOpenModal] = useState(false)
    const [nhanKhaus, setNhanKhaus] = useState([])
    const navigate = useNavigate();
    return (<div class="d-flex flex-fill py-2">
        <div class="bg-white rounded-3 flex-fill p-3 mr-2">
            <div class="d-flex align-items-center justify-content-between">
                <div class="h4">Danh sách thành viên trong hộ</div>
                <button class="btn btn-primary" onClick={() => setOpenModal(true)}>Thêm nhân khẩu</button>
            </div>
            <hr></hr>
            <div class="row">
                <div class="col-2 flex-fill h5">Họ tên</div>
                <div class="col-2 flex-fill h5">Ngày sinh</div>
                <div class="col-1 flex-fill h5">Quan hệ với chủ hộ</div>
                <div class="col-1 flex-fill h5 justify-content-center d-flex">Thao tác</div>
            </div>
            {
                nhanKhaus.map(e => <div class="row">
                    <div class="col-2 flex-fill">{e.hoVaTen}</div>
                    <div class="col-2 flex-fill">{e.ngaySinh}</div>
                    <div class="col-1 flex-fill">{e.quanHeVoiChuHo}</div>
                    <div class="col-1 flex-fill justify-content-center d-flex">
                        <i class="bi bi-file-earmark-excel-fill" onClick={() => {
                            try {
                                setNhanKhaus(nhanKhaus.filter(value => value.id != e.id))
                                fetchAPI(`/api/v1/nhankhau/${e.id}`, {
                                    method: "DELETE",
                                    token: localStorage.getItem("token"),
                                });
                            }
                            catch {
                                alert("Thêm hộ khẩu thất bại")
                            }

                        }}></i>
                    </div>
                </div>)
            }
        </div>
        <div class="d-flex flex-column">
            <div class="bg-white rounded-3 p-3">
                <Formik
                    enableReinitialize
                    initialValues={{
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={async (values) => {
                        try {
                            const { result } = await fetchAPI("/api/v1/hokhau", {
                                method: "POST",
                                body: {
                                    ...values,
                                    nhanKhaus: nhanKhaus.map((nhanKhau) => nhanKhau.id),
                                },
                                token: localStorage.getItem("token"),
                            });
                            navigate(`../${result.id}`)
                        } catch (err) {
                            console.log(err)
                            //setErrorMessage("Có lỗi xảy ra");
                        }
                    }}
                >
                    {({ values }) =>
                        <Form>
                            <div class="h4">Thêm hộ khẩu</div>
                            <hr></hr>
                            <div class="row mb-2">
                                <div class="col-2 flex-fill"><Input name="hoTenChuHo" >Họ tên chủ hộ</Input> </div>
                                <div class="col-2 flex-fill"> <Input name="cccdChuHo">CCCD chủ hộ</Input></div>
                            </div>


                            <Input name="diaChi">Địa chỉ</Input>
                            <div class="d-flex justify-content-center">
                                <button class="btn btn-danger mr-1" onClick={() => navigate("../")}>Huỷ</button>
                                <button type="submit" class="btn btn-primary ">Thêm</button>
                            </div>



                        </Form>
                    }
                </Formik >
            </div >
            <div class="flex-fill">

            </div>
        </div>

        <Modal show={openModal}
            onHide={() => setOpenModal(false)}
            size="xl">
            <Modal.Header closeButton>
                <Modal.Title> Thêm nhân khẩu </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <ThemNhanKhau setOpenModal={setOpenModal} setNhanKhaus={setNhanKhaus} nhanKhaus={nhanKhaus}></ThemNhanKhau>
            </Modal.Body>
        </Modal>


    </div >);
}

export default ThemHoKhau;