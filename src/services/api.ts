//  IP da minha máquina
import axios from "axios";

/* Endereços para cada emulador/simulador:
** Genymotion:                        http://10.0.3.2:3333/
** Emulador Android Studio:           http://10.0.2.2:3333/
** Simulador IOS:                     http://localhost:3333/
** Máquina(Para dispositivo físico):  http://192.168.2.111:3000
https://liferastreio-api.herokuapp.com
*/

const api = axios.create({
  baseURL: "https://liferastreio-api.herokuapp.com",
  timeout: 8000,
});
export default api;
