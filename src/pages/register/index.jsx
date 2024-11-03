import { MdEmail, MdLock, MdPreview } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { api } from "../../services/api";

import { useForm } from "react-hook-form";

import {
  Column,
  Container,
  SubtitleLogin,
  Title,
  TitleLogin,
  Wrapper,
} from "./styles";

const Register = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const onSubmit = async (formData) => {
    try {
      const { data } = await api.get(
        `/users?email=${formData.email}&senha=${formData.senha}`
      );

      if (data.length && data[0].id) {
        navigate("/feed");
        return;
      }

      alert("Usuário ou senha inválido");
    } catch (e) {
      alert("Ocorreu um erro. Tente novamente.");
    }
  };

  console.log("errors", errors);
  return (
    <>
      <Header />
      <Container>
        <Column>
          <Title>
            A plataforma para você aprender com experts, dominar as principais
            tecnologias e entrar mais rápido nas empresas mais desejadas.
          </Title>
        </Column>
        <Column>
          <Wrapper>
            <TitleLogin>Crie seu cadastro</TitleLogin>
            <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                placeholder="Nome Completo"
                leftIcon={<MdPreview />}
                name="nome completo"
                control={control}
              />
              {errors.nomeCompleto && <span>Nome completo é obrigatório</span>}
              <Input
                placeholder="E-mail"
                leftIcon={<MdEmail />}
                name="email"
                control={control}
              />
              {errors.email && <span>E-mail é obrigatório</span>}
              <Input
                type="password"
                placeholder="Senha"
                leftIcon={<MdLock />}
                name="senha"
                control={control}
              />
              {errors.senha && <span>Senha é obrigatório</span>}
              <Button
                title="Crie sua conta"
                variant="secondary"
                type="submit"
              />
            </form>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
};

export { Register };
