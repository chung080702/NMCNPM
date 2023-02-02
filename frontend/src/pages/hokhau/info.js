import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAPI } from "../../untils/fetchAPI";
import { Input } from "../../components/Input";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modal } from "react-bootstrap";
import { ThemNhanKhau } from "../../components/themNhanKhau";
import { ThongSoCuocHopTheoHoKhau } from "../../components/thongSoCuocHop/thongSoCuocHopTheoHoKhau";
import { useAuthContext } from "../../contexts/authContext";
function InfoHoKhau() {
    let { id } = useParams();
    const [hoKhau, setHoKhau] = useState({})
    useEffect(() => {
        const fetchHoKhau = async () => {
            const {
                result: hoKhau
            } = await fetchAPI(`/api/v1/hokhau/${id}`, {

            });
            setHoKhau(hoKhau)
            setNhanKhaus(hoKhau.nhanKhaus)
        }
        fetchHoKhau()
    }, [])
    const { token } = useAuthContext()
    const [openModal, setOpenModal] = useState(false)
    const [nhanKhaus, setNhanKhaus] = useState([])
    const navigate = useNavigate();
    return (<div class="d-flex flex-fill py-2">
        <div class="bg-white rounded-3 flex-fill p-3 mr-2">
            <div class="d-flex align-items-center justify-content-between">
                <div class="h4">Danh sách thành viên trong hộ</div>
                {token != undefined && <button class="btn btn-primary" onClick={() => setOpenModal(true)}>Thêm nhân khẩu</button>}
            </div>
            <hr></hr>
            <div class="row">
                <div class="col-2 flex-fill h5">Họ tên</div>
                <div class="col-2 flex-fill h5">Ngày sinh</div>
                <div class="col-1 flex-fill h5">Quan hệ với chủ hộ</div>
                <div class="col-1 flex-fill h5 justify-content-center d-flex">Thao tac</div>
            </div>
            {
                nhanKhaus.map(e => <div class="row">
                    <div class="col-2 flex-fill">{e.hoVaTen}</div>
                    <div class="col-2 flex-fill">{e.ngaySinh}</div>
                    <div class="col-1 flex-fill">{e.quanHeVoiChuHo}</div>
                    <div class="col-1 flex-fill justify-content-center d-flex">
                        <i class="bi bi-file-earmark-excel-fill" onClick={() => {
                            setNhanKhaus(nhanKhaus.filter(value => value.id != e.id))
                            fetchAPI(`/api/v1/nhankhau/${e.id}`, {
                                method: "DELETE",
                                token: localStorage.getItem("token"),
                            });
                        }}></i>
                    </div>
                </div>)
            }
        </div>
        <div class="col-4 d-flex flex-column p-0">
            <div class="bg-white rounded-3 p-3 ">
                <Formik
                    enableReinitialize
                    initialValues={hoKhau}
                    //validationSchema={SignupSchema}
                    onSubmit={async (values) => {
                        try {
                            console.log()
                            const { result } = await fetchAPI(`/api/v1/hokhau/${id}`, {
                                method: "PUT",
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
                            <div class="h4">Sửa hộ khẩu</div>
                            <hr></hr>
                            <div class="row mb-2">
                                <div class="col-2 flex-fill"><Input name="hoTenChuHo" >Họ tên chủ hộ</Input> </div>
                                <div class="col-2 flex-fill"> <Input name="cccdChuHo">CCCD chủ hộ</Input></div>
                            </div>


                            <Input name="diaChi">Địa chỉ</Input>
                            <div class="d-flex justify-content-center">
                                <button class="btn btn-danger mr-1" onClick={() => navigate("../")}>Huỷ</button>
                                {token != undefined && <button type="submit" class="btn btn-primary ">Sửa</button>}
                            </div>



                        </Form>
                    }
                </Formik >
            </div >
            <div class="flex-fill mt-2 d-flex">
                <ThongSoCuocHopTheoHoKhau></ThongSoCuocHopTheoHoKhau>
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

export default InfoHoKhau;