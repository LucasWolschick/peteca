import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import SystemTemplate from "../_systemtemplate";
import Title from "@/components/system/Title";
import Link from "next/link";
import { useAccount } from "@/hooks/useAccount";

const contas = () => {
  const { accounts, getAllAccounts, createAccount, deleteAccount } =
    useAccount();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  // Carrega todas as contas ao montar o componente
  useEffect(() => {
    getAllAccounts();
  }, []);

  // Cria uma nova conta
  const handleAddAccount = async () => {
    await createAccount({ nome, descricao });
    setNome("");
    setDescricao("");
  };

  // Remove uma conta pelo ID
  const handleDeleteAccount = async (id: string) => {
    await deleteAccount(id);
    getAllAccounts();
  };

  return (
    <SystemTemplate>
      <Title title="Contas Bancárias" />
      <Container className="mt-4">
        <Row className="align-items-start">
          {/* Lista de contas */}
          <Col md={6} className="mb-4">
            <h4 className="mt-4">Lista de Contas</h4>
            <Table striped bordered hover>
              <thead className="table-dark">
                <tr>
                  <th>Nome</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.id}>
                    <td>{account.nome}</td>
                    <td className="d-flex gap-2">
                      <Link
                        href={`/system/caixinha/EditarContas?id=${account.id}`}
                        passHref
                      >
                        <Button variant="primary" size="sm">
                          Editar
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteAccount(account.id)}
                      >
                        Remover
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>

          {/* Formulário para criar nova conta */}
          <Col md={6}>
            <h4>Nova Conta</h4>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddAccount();
              }}
            >
              <Form.Group className="mb-3" controlId="formNome">
                <Form.Label>Nome da Conta</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome da conta"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescricao">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Digite a descrição da conta"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" className="me-2" type="submit">
                Adicionar Conta
              </Button>
              <Button variant="secondary">Cancelar</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </SystemTemplate>
  );
};

export default contas;
