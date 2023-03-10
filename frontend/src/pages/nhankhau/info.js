import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input } from "../../components/Input"
import * as Yup from "yup"
import { fetchAPI } from "../../untils/fetchAPI";
import moment from "moment/moment";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/authContext";

const SignupSchema = Yup.object().shape({
    hoVaTen: Yup.string()
        .required('Required'),
    cccd: Yup.string()
        .required('Required')
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(12, 'Must be exactly 12 digits')
        .max(12, 'Must be exactly 12 digits'),
    diaChiHienTai: Yup.string()
        .required('Required'),
    nguyenQuan: Yup.string()
        .required('Required'),
    soHoChieu: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .required('Required'),
    tonGiao: Yup.string()
        .required('Required'),
    danToc: Yup.string()
        .required('Required'),
    quocTich: Yup.string()
        .required('Required'),
    noiThuongTru: Yup.string()
        .required('Required'),
    diaChiHienTai: Yup.string()
        .required('Required'),
    noiLamViec: Yup.string()
        .required('Required'),
    ngheNghiep: Yup.string()
        .required('Required'),
    trinhDoHocVan: Yup.string()
        .required('Required'),

});

export function InfoNhanKhau() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [nhanKhau, setNhanKhau] = useState({ ngaySinh: "" })
    const { token } = useAuthContext()
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
                <div class="h4">Chi ti???t nh??n kh???u</div>
                <button class="btn btn-danger " onClick={() => navigate("../")}>Hu???</button>
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
                        alert("S???a nh??n kh???u th??nh c??ng")
                    } catch (err) {
                        alert("S???a nh??n kh???u th???t b???i")
                    }
                }
                }
            >
                {({ values }) =>
                    <Form>
                        <hr></hr>
                        <div class="flex-fill flex-column d-flex">

                            <div class="row mb-2">
                                <div class="col-2 flex-fill"><Input name="hoVaTen">H??? v?? t??n</Input> </div>
                                <div class="col-2 flex-fill"><Input name="hoVaTenKhac">H??? v?? t??n kh??c</Input></div>
                            </div>

                            <div class="row mb-2">
                                <div class="flex-fill col-2">
                                    <Input name="ngaySinh" type="date">Ng??y Sinh</Input>
                                </div>
                                <div class="flex-fill col-2">
                                    <div class="h6">Gi???i t??nh</div>
                                    <Input type="radio" name="gioiTinh">Nam</Input>
                                    <Input type="radio" name="gioiTinh">N???</Input>
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-2 flex-fill"><Input name="cccd" >CCCD</Input> </div>
                                <div class="col-2 flex-fill"><Input name="soHoChieu">S??? h??? chi???u</Input></div>
                            </div>

                            <div class="row mb-2">
                                <div class="col-2 flex-fill"><Input name="nguyenQuan">Nguy??n qu??n</Input> </div>
                                <div class="col-1 flex-fill"><Input name="tonGiao">T??n gi??o</Input> </div>
                                <div class="col-1 flex-fill"><Input name="danToc">D??n t???c</Input> </div>
                                <div class="col-2 flex-fill"><Input name="quocTich" >Qu???c t???ch</Input> </div>
                            </div>


                            <Input name="noiThuongTru">N??i th?????ng tr??</Input>
                            <Input name="diaChiHienTai">?????a ch??? hi???n t???i</Input>
                            <Input name="noiLamViec">N??i l??m vi???c</Input>
                            <div class="row mb-2">
                                <div class="col-2 flex-fill"><Input name="quanHeVoiChuHo">Quan h??? v???i ch??? h???</Input> </div>
                                <div class="col-2 flex-fill"><Input name="ngheNghiep">Ngh??? nghi???p</Input> </div>
                                <div class="col-2 flex-fill"><Input name="trinhDoHocVan">Tr??nh ????? h???c v???n</Input> </div>
                                <div class="col-6 flex-fill"></div>
                            </div>

                        </div>

                        {token != undefined && <button type="submit" class="btn btn-primary ">S???a</button>}

                    </Form>
                }
            </Formik >
        </div >
    )
        ;
}


export default InfoNhanKhau;