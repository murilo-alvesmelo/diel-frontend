import moment from "moment"
import React, { Component } from "react"
import { Button, Form, Modal} from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import api from "../../services/api"
import SideBar from "../SideBar"

export default class Mes extends Component{
    state ={
        showModal: false,
        showDesc: '',
        showDate: '',
        showDuracao: '',
        showId: null,
        tarefas: []
    }

    async componentDidMount(){
        const response = await api.get('/tasks')
        this.setState({tarefas: response.data})
        this.loadTarefas()
    }

    loadTarefas = async()=>{
        const dateMax = moment()
            .add({days: 30})
            .format('YYYY-MM-DD 23:59:59')
            const response = await api.get(`/tasks?date=${dateMax}`)
            this.setState({tarefas: response.data}) 
    }
    delete = async (id) =>{
        try {
            await api.delete(`/tasks/${id}`)
            window.location.reload()
        } catch (error) {
            alert(error)
        }
    }
    update = async (id) =>{
        try {
            await api.put(`/tasks/${id}`,{
                desc: this.state.showDesc,
                estimatedAt: this.state.showDate,
                duracao: this.state.showDuracao,
                doneAt: null
            })
            window.location.reload()
        } catch (error) {
            alert(error)
        }
    }
    render(){
        return(
            <div className="corpo">
                <SideBar/>
                <div className="formContainer">
                    <h1>Mês</h1>
                    <Table striped bordered hover className="table">
                        <thead className="table-thead">
                        <tr>
                            <th>#</th>
                            <th>Descrição</th>
                            <th>Data</th>
                            <th>Duração</th>
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody className="tdbody">
                        {
                            this.state.tarefas.map(i => {
                                const data = moment(i.estimatedAt).format("DD-MM-YYYY, h:mm a")
                                return(
                                    <tr key={i.id}>
                                        <td>{i.id}</td>
                                        <td>{i.desc}</td>
                                        <td>{data}</td>
                                        <td>{i.duracao.slice(0,5)}</td>
                                        <td className="td">
                                            <Button variant="outline-primary" className="button" onClick={() => this.setState({showModal: true, showDesc: i.desc, showDate: data, showId: i.id})}>Editar</Button>
                                            <Button variant="outline-danger" className="button" onClick={() => this.delete(i.id)}>Excluir</Button>
                                        </td>
                                        <Modal
                                            show={this.state.showModal}
                                            onHide={() => this.setState({showModal: false})}
                                            dialogClassName="modal-90w"
                                            aria-labelledby="example-custom-modal-styling-title"
                                        >
                                        <Modal.Header closeButton>
                                        <Modal.Title id="example-custom-modal-styling-title"> 
                                            Detalhes da entrega
                                        </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Descrição</Form.Label>
                                            <Form.Control type="text" name="desc" placeholder={this.state.showDesc} onChange={(e) => this.setState({showDesc: e.target.value})}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Data</Form.Label>
                                            <Form.Control type="datetime-local" name="estimatedAt" onChange={(e) => this.setState({showDate: e.target.value})}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Duração</Form.Label>
                                            <Form.Control type="time" name="duracao" onChange={(e) => this.setState({showDuracao: e.target.value})}/>
                                        </Form.Group>
                                        <Button variant="outline-primary" className="button" onClick={() => this.update(this.state.showId)}>Editar</Button>
                                        </Modal.Body>
                                        </Modal>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
        )
}
}