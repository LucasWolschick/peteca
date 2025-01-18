import React from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import SystemTemplate from "../_systemtemplate";
import Title from "@/components/system/Title";
import Link from "next/link";

const contas = () => {
  return (
    <SystemTemplate>
      <Title title="Contas Bancárias" />
      <Container className="mt-4">
        <Row className="align-items-start">
          {/* Coluna da listagem de contas */}
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
                <tr>
                  <td>Conta Caixa</td>
                  <td className="d-flex gap-2">
                    <Link href="/system/caixinha/EditarContas" passHref>
                      <Button variant="primary" size="sm">
                        Editar
                      </Button>
                    </Link>
                    <Button variant="danger" size="sm">
                      Remover
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>Poupança BB</td>
                  <td className="d-flex gap-2">
                    <Link href="/system/caixinha/EditarContas" passHref>
                      <Button variant="primary" size="sm">
                        Editar
                      </Button>
                    </Link>
                    <Button variant="danger" size="sm">
                      Remover
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>Dinheiro</td>
                  <td className="d-flex gap-2">
                    <Link href="/system/caixinha/EditarContas" passHref>
                      <Button variant="primary" size="sm">
                        Editar
                      </Button>
                    </Link>
                    <Button variant="danger" size="sm">
                      Remover
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>

          {/* Coluna do formulário de edição/criação */}
          <Col md={6}>
            <h4>Nova Conta</h4>
            <Form>
              <Form.Group className="mb-3" controlId="formNome">
                <Form.Label>Nome da Conta</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome da conta"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDescricao">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Digite a descrição da conta"
                />
              </Form.Group>

              <Button variant="primary" className="me-2">
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
