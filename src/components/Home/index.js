import React from "react";
import SideBar from "../SideBar";
import './index.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from "../../services/api";


export default class Home extends React.Component{
    state ={
        desc: '',
        estimatedAt: '',
        duracao: '',
        doneAt: null
        
    }
    handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            await api.post('/tasks',{...this.state})
            window.location.href = '/hoje';
        } catch (error) {
            alert(error)   
        }
    }
    render(){
        return(
            <div className="corpo">
            <SideBar/>
            <div className="formContainer">
                <h1>Adicionar tarefa</h1>
                <Form onSubmit={this.handleSubmit} className="form">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control type="text" name="desc" onChange={(e)=> this.setState({desc: e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Data</Form.Label>
                        <Form.Control type="date" name="estimatedAt" onChange={(e) => this.setState({estimatedAt: e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Duração</Form.Label>
                        <Form.Control type="time" name="duracao" onChange={(e) => this.setState({duracao: e.target.value})}/>
                    </Form.Group>
                <div className="button">
                    <Button variant="outline-primary" type="submit">Adicionar</Button>
                </div>
                </Form>
            </div>
            </div>
        )
    }
}