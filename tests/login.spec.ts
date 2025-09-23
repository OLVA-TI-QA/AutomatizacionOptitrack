import { test } from 'appwright';
import { LoginPage } from '../src/pages/LoginPage';
import { GestionesPage } from '../src/pages/GestionesPage';
import { NambarOption, TypeEstado, TypeGestiones } from '../src/types/InterfacesYEnums';
import { HistorialPage } from '../src/pages/HistorialPage';

function sleep(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

test('TC-LOGIN-003 - Contraseña fallida', async ({ device }) => {
    const loginPage = new LoginPage(device);

    await loginPage.login('Jsrios', 'testito');
    await loginPage.validateFailedLogin();
});

test('TC-LOGIN-004 - Usuario fallido', async ({ device }) => {
    const loginPage = new LoginPage(device);

    await loginPage.login('Testito', 'olva24');
    await loginPage.validateFailedLogin();
});

test('TC-LOGIN-006 - Mostrar IP', async ({ device }) => {
    const loginPage = new LoginPage(device);
    await loginPage.validateIpDisplayed();
});
