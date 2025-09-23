import { Device, expect } from 'appwright';
import { MobileBasePage } from '../pages/base/MobileBasePage';

/**
 * Página de Login para Appwright (móvil)
 */
export class LoginPage extends MobileBasePage {
  // Mensajes y constantes
  private static readonly MSG_INVALID_CREDENTIALS = 'Credenciales Incorrectas';
  private static readonly MSG_SUCCESS_TITLE_FROM_DASHBOARD = 'Lista de gestiones';

  constructor(device: Device) {
    super(device);
  }

  /** Realiza el login con usuario y contraseña, identificados por label o id */
  public async login(username: string, password: string): Promise<void> {

    const usernameInput = await this.getFirstVisibleLocator([
      { type: 'text', value: 'Usuario', options: { exact: false } },
      { type: 'id', value: 'username' }
    ]);

    const passwordInput = await this.getFirstVisibleLocator([
      { type: 'text', value: 'Password', options: { exact: false } },
      { type: 'id', value: 'password' }
    ]);

    const submitButton = await this.getFirstVisibleLocator([
      { type: 'text', value: 'INGRESAR', options: { exact: false } },
      { type: 'id', value: 'submit' }
    ]);

    await usernameInput.fill(username);
    await passwordInput.fill(password);

    await submitButton.tap();
  }

  /** Verifica estado exitoso del login */
  public async validateSuccessfulLogin(): Promise<void> {
    const successTextElement = this.locator('text', LoginPage.MSG_SUCCESS_TITLE_FROM_DASHBOARD, { exact: false });
    await expect(successTextElement).toBeVisible();
  }

  /** Verifica error por usuario inválido */
  public async validateFailedLogin(): Promise<void> {
    const errorTextElement = this.locator('text', LoginPage.MSG_INVALID_CREDENTIALS, { exact: false });
    await expect(errorTextElement).toBeVisible();
  }

  public async validateIpDisplayed(): Promise<void> {
    const ipText = await this.isVisible('id', 'com.olvati.optitrack2022:id/txtIp');
    expect(ipText).toBeTruthy();
  }
}
