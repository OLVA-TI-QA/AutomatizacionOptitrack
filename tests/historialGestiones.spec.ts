import { test } from 'appwright';
import { LoginPage } from '../src/pages/LoginPage'; // ajusta la ruta si es diferente
import { GestionesPage } from '../src/pages/GestionesPage';
import { NambarOption } from '../src/types/InterfacesYEnums';
import { HistorialPage } from '../src/pages/HistorialPage';

function sleep(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

test('Search Gestiones - exitoso', async ({ device }) => {
    const loginPage = new LoginPage(device);
    const gestionesPage = new GestionesPage(device);
    const historialGestionesPage = new HistorialPage(device);

    await loginPage.login('Jsrios', 'olva24');
    await loginPage.validateSuccessfulLogin();
    await sleep(5);

    await gestionesPage.navbarOptions(NambarOption.Historial);
    await sleep(2);
    await historialGestionesPage.validateHistorialPage();
    await historialGestionesPage.buscarGestiones('01 September 2025', '03 September 2025')
    await historialGestionesPage.validateSearchSuccess()
});

test('Search Gestiones/Filtrar Tipo - exitoso', async ({ device }) => {
    const loginPage = new LoginPage(device);
    const gestionesPage = new GestionesPage(device);
    const historialGestionesPage = new HistorialPage(device);

    await loginPage.login('Jsrios', 'olva24');
    await loginPage.validateSuccessfulLogin();
    await sleep(5);

    await gestionesPage.navbarOptions(NambarOption.Historial);
    await sleep(2);
    await historialGestionesPage.validateHistorialPage();
    await historialGestionesPage.buscarGestiones('01 September 2025', '03 September 2025')
    // agregar cosas 
    await historialGestionesPage.validateSearchSuccess()
});
