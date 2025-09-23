import { test } from 'appwright';
import { LoginPage } from '../src/pages/LoginPage'; // ajusta la ruta si es diferente
import { GestionesPage } from '../src/pages/GestionesPage';
import { NambarOption, TypeEstado, TypeGestiones } from '../src/types/InterfacesYEnums';
import { HistorialPage } from '../src/pages/HistorialPage';

function sleep(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

// test('Search Gestiones - exitoso', async ({ device }) => {
//     const loginPage = new LoginPage(device);
//     const gestionesPage = new GestionesPage(device);
//     const historialGestionesPage = new HistorialPage(device);

//     await loginPage.login('Jsrios', 'olva24');
//     await loginPage.validateSuccessfulLogin();
//     await sleep(5);

//     await gestionesPage.navbarOptions(NambarOption.Historial);
//     await sleep(2);
//     await historialGestionesPage.validateHistorialPage();
//     await historialGestionesPage.buscarGestiones('01 September 2025', '03 September 2025')
//     await historialGestionesPage.validateSearchSuccess()
// });

// test('Search Gestiones/Filtrar visualización de selector de estados- exitoso', async ({ device }) => {
//     const loginPage = new LoginPage(device);
//     const gestionesPage = new GestionesPage(device);
//     const historialGestionesPage = new HistorialPage(device);

//     await loginPage.login('Jsrios', 'olva24');
//     await sleep(3);
//     await loginPage.validateSuccessfulLogin();
//     await sleep(3);

//     await gestionesPage.navbarOptions(NambarOption.Historial);
//     await sleep(2);
//     await historialGestionesPage.validateHistorialPage();
//     await historialGestionesPage.buscarGestiones('01 September 2025', '03 September 2025')
//     await historialGestionesPage.validateSearchSuccess()
//     await sleep(3)
//     await historialGestionesPage.filtrarTipoGestiones(TypeGestiones.Recojos)
//     await sleep(3)
//     await historialGestionesPage.validarFiltroEstadosVisible(true)
// });

// test('Search Gestiones/Filtrar Tipo Gestiones Recojos - exitoso', async ({ device }) => {
//     const loginPage = new LoginPage(device);
//     const gestionesPage = new GestionesPage(device);
//     const historialGestionesPage = new HistorialPage(device);

//     await loginPage.login('Jsrios', 'olva24');
//     await sleep(3);
//     await loginPage.validateSuccessfulLogin();
//     await sleep(3);

//     await gestionesPage.navbarOptions(NambarOption.Historial);
//     await sleep(2);
//     await historialGestionesPage.validateHistorialPage();
//     await historialGestionesPage.buscarGestiones('01 September 2025', '19 September 2025')
//     await historialGestionesPage.validateSearchSuccess()
//     await sleep(3)
//     const estadoTexto = await historialGestionesPage.validarFiltroTipoGestiones(TypeGestiones.Recojos)
//     await sleep(3)
//     await historialGestionesPage.validarFiltroEstadosVisible(true)
//     await sleep(3)
//     await historialGestionesPage.validarSeleccionEstado(estadoTexto)
// });

// test('Search Gestiones/Filtrar Tipo Gestiones Todos - exitoso', async ({ device }) => {
//     const loginPage = new LoginPage(device);
//     const gestionesPage = new GestionesPage(device);
//     const historialGestionesPage = new HistorialPage(device);

//     await loginPage.login('Jsrios', 'olva24');
//     await sleep(3);
//     await loginPage.validateSuccessfulLogin();
//     await sleep(3);

//     await gestionesPage.navbarOptions(NambarOption.Historial);
//     await sleep(2);
//     await historialGestionesPage.validateHistorialPage();
//     await historialGestionesPage.buscarGestiones('01 September 2025', '19 September 2025')
//     await historialGestionesPage.validateSearchSuccess()
//     await sleep(3)
//     await historialGestionesPage.validarFiltroTipoGestiones(TypeGestiones.Recojos)
//     await historialGestionesPage.validarFiltroEstadosVisible(true)
//     await historialGestionesPage.validarFiltroTipoGestiones(TypeGestiones.Todos)
//     await historialGestionesPage.validarFiltroEstadosVisible(false)
// });
