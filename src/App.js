import React, { useState, useEffect} from 'react';
import api from './api';
import Header from './header';
import { 
    Container, 
    Table, 
    TableRow, 
    TableCell, 
    TableHead,
    Dialog, 
    Button, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    TextField, 
    DialogActions} from '@material-ui/core';
import './style.css';

function App() {
    const [ lista, setLista ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ cliente, setCliente ] = useState('');
    const [ servico, setServico ] = useState('');
    const [ orcamento, setOrcamento ] = useState('');
    const [ situacao, setSituacao] = useState('');
    const [ id, setId ] = useState('');
    const [ botaoEditar, setBotaoEditar ] = useState(false);
    const [ botaoAdicionar, setBotaoAdicionar ] = useState(false);

  function openModal() {
        setBotaoAdicionar(true);
        setBotaoEditar(false);
        setCliente('');
        setServico('');
        setOrcamento('');
        setSituacao('');
        setId('');
        setOpen(true);
    };

    function closeModal() {
        setOpen(false);
    };

    function listaAssistencia(){
         api.get('/assistencia').then((response) => {
            const itens = response.data;
            setLista(itens);
                setCliente('');
                setServico('');
                setOrcamento('');
                setSituacao('');
                setId('');
        });
    };
useEffect(() => {
        listaAssistencia();
    }, []);
    
    function addAtendimento(){
        const cliente = cliente;
        const servico = servico;
        const orcamento = orcamento;
        const situacao = situacao;
        
        // post ingles
        api.post('/assistencia', {cliente:cliente, servico: servico, orcamento: orcamento, situacao: situacao}).then((response) => {
            setCliente('');
            setServico('');
            setOrcamento('');
            setSituacao('');
            setId('');
            setOpen(false);
            listaAssistencia();
        });
    };
function deleteAtendimento(id){
        api.delete(`/assistencia/${id}`).then((response) => {
            listaAssistencia();
        });
    };

    function openEditar(id,cliente,servico,orcamento,situacao){
        setBotaoAdicionar(true);
        setBotaoEditar(true);
        setCliente('');
        setServico('');
        setOrcamento('');
        setSituacao('');
        setId('');
        setOpen(true);

      };
      // put ingles
      function editarAtendimento(){
        api.put(`/assistencia/${id}`,{cliente:cliente, servico: servico, orcamento: orcamento, situacao: situacao}).then((response) => {
            setOpen(false);
            setCliente('');
            setServico('');
            setOrcamento('');
            setSituacao('');
            setId('');
            listaAssistencia();
        });
    };

   return (
        <>
         <Header />
         <Container maxWidth="lg" className="container"> 
            <Table>
                
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Servico</TableCell>
                        <TableCell>Orcamento</TableCell>
                        <TableCell>Situacao</TableCell>
                        
                        </TableRow>
                </TableHead>
                {lista.map(itens => (
                    <TableRow key={itens.id}>
                        <TableCell>{itens.id}</TableCell>
                        <TableCell>{itens.cliente}</TableCell>
                        <TableCell>{itens.servico}</TableCell>
                        <TableCell>{itens.orcamento}</TableCell>
                        <TableCell>{itens.situacao}</TableCell>

                        <TableCell>
                            &nbsp;
                            <Button 
                                color="primary"
                                variant="outlined" 
                                onClick={() => openEditar(itens.id,itens.Cliente, itens.Servico, itens.Orcamento, itens.Situacao)}
                                size="small"> 
                                Editar 
                            </Button>
                            &nbsp;
                            <Button 
                                onClick={() => deleteAtendimento(itens.id)}
                                variant="outlined" 
                                size="small" 
                                color="secondary">Apagar</Button>
                        </TableCell>
                    </TableRow>
                     
                     ))}
            </Table>
            <Button 
                onClick={openModal}
                variant="contained" 
                color="primary" 
                style={{marginTop: '20px'}}>
                Adicionar
            </Button>
         </Container>
         <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">Atendimento</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Informe os dados do atendimento
                </DialogContentText>
               <TextField
                    autoFocus
                    margin="dense"
                    id="cliente"
                    label="Cliente"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                />

                <TextField
                    margin="dense"
                    id="servico"
                    label="Servico"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={servico}
                    onChange={e => setServico(e.target.value)}

                />
                <TextField
                    margin="dense"
                    id="orcamento"
                    label="Orcamento"
                    autoComplete="off"
                    type="number"
                    fullWidth
                    value={orcamento}
                    onChange={e => setOrcamento(e.target.value)}

                    />
                    <TextField
                    margin="dense"
                    id="situacao"
                    label="Situacao"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={situacao}
                    onChange={e => setSituacao(e.target.value)}

                />

               </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="primary">
                    Cancelar
                </Button>
                <Button color="primary" onClick={botaoEditar ? editarAtendimento : addAtendimento }>
                    Salvar
                </Button>
            </DialogActions>
         </Dialog>
        </>
    )
};

export default App;
