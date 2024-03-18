import Dialog from "@/components/system/Dialog";
import Title from "@/components/system/Title";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMask } from "@react-input/mask";
import {
  FormEvent,
  FormEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SystemTemplate from "../../_systemtemplate";
import { useRouter } from "next/router";
import { SystemContext } from "@/SystemContext";
import { Permission, PermissionsAPI } from "@/apis/permissionsAPI";
import { User, UsuarioAPI } from "@/apis/usuarioAPI";
import { AuthContext } from "@/AuthContext";

function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function Create() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState(new Date(2002, 0, 1));
  const [email, setEmail] = useState("");
  const [ra, setRa] = useState("");
  const [matricula, setMatricula] = useState("");
  const [userPermissions, setUserPermissions] = useState(new Set<Permission>());
  const [photo, setPhoto] = useState<File>();

  const inputRef = useRef<HTMLInputElement>(null);
  const matriculaMask = useMask({ mask: "ra______", replacement: { _: /\d/ } });

  const criando = id === "new";
  const loggedUser = useContext(AuthContext).loggedUser;
  const souAdmin =
    loggedUser?.userPermissions.includes("admin") ||
    loggedUser?.userPermissions.includes("Gerir Cadastros");

  useEffect(() => {
    if (criando) return;

    const nId = Number(id);
    if (!isNaN(nId)) {
      UsuarioAPI.getUserById(nId)
        .then((response) => {
          const user = response.data;
          setName(user.nome);
          setEmail(user.email);
          setRa(user.ra ?? "");
          setMatricula(user.matricula ?? "");
          setBirthdate(user.data_nascimento);
          return PermissionsAPI.getUserPermissions(nId);
        })
        .then((perms) => {
          setUserPermissions(new Set(perms.data));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const submit: FormEventHandler<HTMLFormElement> = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || (!ra && !matricula)) {
      alert("Por favor preencha todos os campos.");
      return;
    }

    const userPerms = Array.from(userPermissions);

    if (criando) {
      UsuarioAPI.register(name, email, email, ra, matricula, birthdate)
        .then((res) => {
          const id = res.data.id;
          PermissionsAPI.setUserPermissions(id, userPerms).then((res) => {
            alert("Usuário cadastrado com sucesso.");
            router.push("/system/usuarios");
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      UsuarioAPI.updateUser(Number(id), name, email, ra, matricula, birthdate)
        .then((res) => {
          PermissionsAPI.setUserPermissions(Number(id), userPerms).then(
            (res) => {
              alert("Usuário atualizado com sucesso.");
              router.push("/system/usuarios");
            }
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const resetUserPassword = () => {
    alert("Não implementado");
  };
  const unregisterUser = () => {
    UsuarioAPI.deleteUser(Number(id))
      .then(() => {
        alert("Usuário descadastrado com sucesso.");
        router.push("/system/usuarios");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <SystemTemplate>
      <div className="container-fluid">
        <Title title={criando ? "Cadastrar usuário" : "Editar usuário"} />
        <form
          className="row mt-3 align-items-center"
          method="post"
          onSubmit={submit}
        >
          <div className="col-md-6">
            <div className="row justify-content-center align-items-center">
              <ImageUpload inputRef={inputRef} setFile={(x) => setPhoto(x)} />
            </div>
            <div className="text-center d-flex flex-column align-items-center gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="btn btn-primary btn-sm rounded-5 col-lg-8 col-md-12 col-8 mt-3"
              >
                Alterar foto
              </button>
              {souAdmin && !criando && (
                <Dialog
                  buttonText="Reiniciar senha"
                  text="Deseja realmente invalidar a senha deste usuário?"
                  onConfirm={() => resetUserPassword()}
                />
              )}
              {souAdmin && !criando && (
                <Dialog
                  buttonText="Descadastrar"
                  text="Deseja realmente descadastrar este usuário?"
                  onConfirm={() => unregisterUser()}
                />
              )}
            </div>
          </div>
          <div className="col-md-6 mt-md-0 mt-3">
            <div>
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                type="text"
                className="form-control-sm form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="birthdate">Data de nascimento</label>
              <input
                id="birthdate"
                type="date"
                className="form-control-sm form-control"
                value={formatDateToYYYYMMDD(birthdate)}
                onChange={(e) => setBirthdate(new Date(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="email">Endereço de e-mail</label>
              <input
                id="email"
                type="email"
                className="form-control-sm form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="ra">Registro acadêmico</label>
              <input
                id="ra"
                type="text"
                className="form-control-sm form-control"
                value={ra}
                onChange={(e) => {
                  setRa(e.target.value);
                  setMatricula("");
                }}
                ref={matriculaMask}
              />
            </div>
            <div>
              <label htmlFor="matricula">Matrícula</label>
              <input
                id="matricula"
                type="text"
                className="form-control-sm form-control"
                value={matricula}
                onChange={(e) => {
                  setMatricula(e.target.value);
                  setRa("");
                }}
              />
            </div>
          </div>
          <PermissionsPane
            userPermissions={userPermissions}
            setUserPermissions={setUserPermissions}
          />
          <div className="col-lg-4 col-md-12 text-md-end text-center mt-auto">
            <button
              type="submit"
              className="btn btn-primary btn-sm rounded-5 col-lg-12 col-md-6 col-8"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </SystemTemplate>
  );
}

function PermissionToggle({
  name,
  value,
  toggleValue,
}: {
  name: Permission;
  value: boolean;
  toggleValue: (value: boolean) => void;
}) {
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        checked={value}
        onChange={(e) => toggleValue(!value)}
      />
      <label className="form-check-label">{name}</label>
    </div>
  );
}

function PermissionsPane({
  userPermissions,
  setUserPermissions,
}: {
  userPermissions: Set<Permission>;
  setUserPermissions: React.Dispatch<React.SetStateAction<Set<Permission>>>;
}) {
  const permissions = useContext(SystemContext).permissions.map((p) => {
    return (
      <PermissionToggle
        name={p}
        key={p}
        value={userPermissions.has(p)}
        toggleValue={(value) => {
          if (value) {
            setUserPermissions((prev) => new Set(prev).add(p));
          } else {
            setUserPermissions((prev) => {
              const next = new Set(prev);
              next.delete(p);
              return next;
            });
          }
        }}
      />
    );
  });

  const half = Math.ceil(permissions.length / 2);
  const left = permissions.slice(0, half);
  const right = permissions.slice(half);

  return (
    <div className="col-md-12 mt-3 ">
      <strong>Permissões</strong>
      <div className="row">
        <div className="col-lg-4 col-md-6">{left}</div>
        <div className="col-lg-4 col-md-6">{right}</div>
      </div>
    </div>
  );
}

// https://stackoverflow.com/a/57781164
function ImageUpload({
  inputRef,
  setFile,
}: {
  inputRef: React.Ref<HTMLInputElement>;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}) {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState<string>();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  return (
    <>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        className="d-none"
        ref={inputRef}
        onChange={onSelectFile}
      />
      {selectedFile && (
        <div
          className="profile-picture"
          style={{
            backgroundImage: 'url("' + preview + '")',
          }}
        ></div>
      )}
      {!selectedFile && <FontAwesomeIcon icon={faUserCircle} size="10x" />}
    </>
  );
}
