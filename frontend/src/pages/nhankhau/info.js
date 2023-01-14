import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input } from "../../components/Input"
import * as Yup from "yup"
import { fetchAPI } from "../../untils/fetchAPI";
import moment from "moment/moment";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";


const SignupSchema = Yup.object().shape({
    // hoVaTen: Yup.string()
    //     .min(2, 'Too Short!')
    //     .max(70, 'Too Long!')
    //     .required('Required'),
    // cccd: Yup.string()
    //     .required('Required')
    //     .matches(/^[0-9]+$/, "Must be only digits")
    //     .min(12, 'Must be exactly 12 digits')
    //     .max(12, 'Must be exactly 12 digits'),
    // diaChi: Yup.string()
    //     .min(2, 'Too Short!')
    //     .max(70, 'Too Long!')
    //     .required('Required'),
    // ngaySinh: Yup.date().required('Required'),
    // gioiTinh: Yup.string().required('Required'),
    // nguyenQuan: Yup.string()
    //     .required('Required'),

});

export function InfoNhanKhau() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [nhanKhau, setNhanKhau] = useState({ ngaySinh: "" })
    useEffect(() => {
        const fetchNhanKhau = async () => {
            const {
                result: nhanKhau
            } = await fetchAPI(`/api/v1/nhankhau/${id}`, { method: "GET" })
            setNhanKhau(nhanKhau);
            console.log(nhanKhau)
        }
        fetchNhanKhau();
    }, [])
    return (
        <div class="bg-white rounded-3 my-2 flex-fill p-3 ">
            <div class="align-text-center d-flex justify-content-between">
                <div class="h4">Chi tiết nhân khẩu</div>
                <button class="btn btn-danger " onClick={() => navigate("../")}>Huỷ</button>
            </div>
            <Formik
                enableReinitialize
                initialValues={
                    {
                        ...nhanKhau,
                        ngaySinh: moment(nhanKhau.ngaySinh).format("YYYY-MM-DD"),
                    }
                }
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                    try {
                        const { result } = await fetchAPI(`/api/v1/nhankhau/${id}`, {
                            method: "PUT",
                            token: localStorage.getItem("token"),
                            body: {
                                ...values,
                                ngaySinh: moment(values.ngaySinh + "Z").toISOString(),
                            }
                        });
                        alert("Sửa nhân khẩu thành công")
                    } catch (err) {
                        alert("Sửa nhân khẩu thất bại")
                    }
                }
                }
            >
                {({ values }) =>
                    <Form>
                        <hr></hr>
                        <div class="flex-fill flex-column d-flex">

                            <div class="row mb-2">
                                <div class="col-2 flex-fill"><Input name="hoVaTen">Họ và tên</Input> </div>
                                <div class="col-2 flex-fill"><Input name="hoVaTenKhac">Họ và tên khác</Input></div>
                            </div>

                            <div class="row mb-2">
                                <div class="flex-fill col-2">
                                    <div>Ngày Sinh</div>
                                    <Field name="ngaySinh" type="date" class="rounded-2" />
                                    <br></br>
                                    <ErrorMessage name="ngaySinh" />
                                </div>
                                <div class="flex-fill col-2">
                                    <div>Giới tính</div>
                                    <label className="mr-2">
                                        <Field type="radio" name="gioiTinh" value="Nam" />
                                        <span>Nam</span>
                                    </label>
                                    <label className="space-x-3">
                                        <Field type="radio" name="gioiTinh" value="Nữ" />
                                        <span>Nữ</span>
                                    </label>
                                    <ErrorMessage name="gioiTinh" />
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-2 flex-fill"><Input name="cccd" >CCCD</Input> </div>
                                <div class="col-2 flex-fill"><Input name="soHoChieu">Số hộ chiếu</Input></div>
                            </div>

                            <div class="row mb-2">
                                <div class="col-2 flex-fill"><Input name="nguyenQuan">Nguyên quán</Input> </div>
                                <div class="col-1 flex-fill"><Input name="tonGiao">Tôn giáo</Input> </div>
                                <div class="col-1 flex-fill"><Input name="danToc">Dân tộc</Input> </div>
                                <div class="col-2 flex-fill"><Input name="quocTich" >Quốc tịch</Input> </div>
                            </div>


                            <Input name="noiThuongTru">Nơi thường trú</Input>
                            <Input name="diaChiHienTai">Địa chỉ hiện tại</Input>
                            <Input name="noiLamViec">Nơi làm việc</Input>
                            <div class="row mb-2">
                                <div class="col-2 flex-fill"><Input name="quanHeVoiChuHo">Quan hệ với chủ hộ</Input> </div>
                                <div class="col-2 flex-fill"><Input name="ngheNghiep">Nghề nghiệp</Input> </div>
                                <div class="col-2 flex-fill"><Input name="trinhDoHocVan">Trình độ học vấn</Input> </div>
                                <div class="col-6 flex-fill"></div>
                            </div>

                        </div>

                        <button type="submit" class="btn btn-primary ">Sửa</button>

                    </Form>
                }
            </Formik >
        </div >
    )
        ;
}


export default InfoNhanKhau;