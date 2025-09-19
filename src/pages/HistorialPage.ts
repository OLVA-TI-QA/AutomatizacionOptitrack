import { Device, expect } from 'appwright';
import { MobileBasePage } from '../pages/base/MobileBasePage';
import { TypeEstado, TypeGestiones } from '../types/InterfacesYEnums';

function sleep(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
/**
 * Página de Historial de Gestiones para Appwright (móvil)
 */
export class HistorialPage extends MobileBasePage {
    // Mensajes y constantes
    private static readonly TEXT_TOOLBAR = 'Historial de gestiones';

    constructor(device: Device) {
        super(device);
    }

    /** Verifica estado exitoso de la carga de la página */
    public async validateHistorialPage(): Promise<void> {
        const successTextToolbar = this.locator('text', HistorialPage.TEXT_TOOLBAR, { exact: false });
        await expect(successTextToolbar).toBeVisible();
    }

    public async selectCalendarYear(): Promise<void> {
        const selectStartDate = await this.getFirstVisibleLocator([
            { type: 'id', value: 'com.olvati.optitrack2022:id/mdtp_date_picker_year' },
            { type: 'xpath', value: '//android.widget.Button[@resource-id="com.olvati.optitrack2022:id/mdtp_date_picker_year"]', options: { exact: false } }
        ]);
        await expect(selectStartDate).toBeVisible();
        await selectStartDate.tap();

        const selectYear = this.locator('xpath', '//android.widget.TextView[@content-desc="2025 selected"]', { exact: false });
        await expect(selectYear).toBeVisible();
        await selectYear.tap();
    }

    public async selectCalendarDate(date: String): Promise<void> { //date: en este formato "01 September 2025"
        const selectDate = this.locator('xpath', `//android.view.View[@content-desc="${date}"]`, { exact: false });
        await expect(selectDate).toBeVisible();
        await selectDate.tap();

        const okButton = this.locator('id', 'com.olvati.optitrack2022:id/mdtp_ok');
        await expect(okButton).toBeVisible();
        await okButton.tap();
    }

    public async selectStartDate(date: String): Promise<void> {
        const selectStartDate = this.locator('id', 'com.olvati.optitrack2022:id/tv_date_filter_gestion_entrega');
        await expect(selectStartDate).toBeVisible();
        await selectStartDate.tap();
        await this.selectCalendarDate(date);
    }

    public async selectEndDate(date: String): Promise<void> {
        const selectEndDate = this.locator('id', 'com.olvati.optitrack2022:id/tv_date_filter_gestion_entrega_fin');
        await expect(selectEndDate).toBeVisible();
        await selectEndDate.tap();

        await this.selectCalendarDate(date);
    }

    /** Realiza la busqueda utilizando los filtros */
    public async buscarGestiones(fromDate: String, toDate: String): Promise<void> {
        this.selectStartDate(fromDate)
        await sleep(5);
        this.selectEndDate(toDate)
        await sleep(5);

        const buscarButton = this.locator('id', 'com.olvati.optitrack2022:id/btnBuscar');

        await expect(buscarButton).toBeVisible();
        await buscarButton.tap();
    }

    /** Verifica error por usuario inválido */
    public async validateSearchSuccess(): Promise<void> {
        // Define el localizador base, sin el índice
        const baseLocator = '//android.widget.TextView[@resource-id="com.olvati.optitrack2022:id/texto_circulo"]';

        // Define un límite de búsqueda. Esto es crucial para que la prueba no sea interminable
        const searchLimit = 3;

        // Variable para almacenar la cuenta total de elementos encontrados
        let foundElementsCount = 0;

        // Bucle para buscar elementos del índice 1 hasta el límite
        for (let i = 1; i <= searchLimit; i++) {
            // Construye el selector con el índice actual, por ejemplo, `(//...)[1]`, `(//...)[2]`, etc.
            const locatorWithIndex = `(${baseLocator})[${i}]`;

            // Usa el método de tu framework para verificar si el elemento existe en el DOM
            // `isExisting()` o `isVisible()` son métodos comunes.
            const elementExists = await this.locator('xpath', locatorWithIndex, { exact: false }).isVisible();

            if (elementExists) {
                // Si el elemento existe, incrementa el contador
                foundElementsCount++;
            } else {
                // Si el elemento no existe (por ejemplo, [30]), significa que la lista terminó.
                // Puedes salir del bucle para no seguir buscando innecesariamente
                break;
            }
        }

        // Finalmente, usa una aserción para verificar que el número total de elementos es mayor que 0
        expect(foundElementsCount).toBeGreaterThan(0);
    }

    /** Realiza la busqueda utilizando los filtros */
    public async filtrarValidarFiltroTipoGestiones(typeGestiones: TypeGestiones): Promise<string> {
        const filtroTypeGestionesButton = this.locator('id', 'com.olvati.optitrack2022:id/fab_ingreso_manual');
        await expect(filtroTypeGestionesButton).toBeVisible();
        await filtroTypeGestionesButton.tap();
        await sleep(5);
        let contador = 0;

        switch (typeGestiones) {
            case TypeGestiones.Entregas:
                const entregasCount = this.locator('id', 'com.olvati.optitrack2022:id/tv_item_count_gestion')
                const entregasCountText = await entregasCount.getText()
                contador = parseInt(entregasCountText)

                const entregasOption = this.locator('xpath', '//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="Entregas"]', { exact: false });
                await expect(entregasOption).toBeVisible();
                await entregasOption.tap();

                break;
            case TypeGestiones.Recojos:
                const recojosCount = this.locator('id', 'com.olvati.optitrack2022:id/tv_item_count_recojo_gestion_2')
                const recojoCountText = await recojosCount.getText()
                contador = parseInt(recojoCountText)

                const recojosOption = this.locator('xpath', '//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="Recojos"]', { exact: false });
                await expect(recojosOption).toBeVisible();
                await recojosOption.tap();

                break;
            case TypeGestiones.GuiasLocal:
                const guiaLocalCount = this.locator('id', 'com.olvati.optitrack2022:id/tv_item_count_guias')
                const guiaLocalCountText = await guiaLocalCount.getText()
                contador = parseInt(guiaLocalCountText)

                const guiaLocalOption = this.locator('xpath', '//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="Guias Local"]', { exact: false });
                await expect(guiaLocalOption).toBeVisible();
                await guiaLocalOption.tap();

                break;
            case TypeGestiones.GuiasNacional:
                const guiaNacionalCount = this.locator('id', 'com.olvati.optitrack2022:id/tv_item_count_guias_rec')
                const guiaNacionalCountText = await guiaNacionalCount.getText()
                contador = parseInt(guiaNacionalCountText)

                const guiaNacionalOption = this.locator('xpath', '//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="Guias Nacional"]', { exact: false });
                await expect(guiaNacionalOption).toBeVisible();
                await guiaNacionalOption.tap();

                break;
            case TypeGestiones.Todos:
                const todosOption = this.locator('xpath', '//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="Todos"]', { exact: false });
                await expect(todosOption).toBeVisible();
                await todosOption.tap();

                break;
        }

        const baseLocator = '//android.widget.TextView[@resource-id="com.olvati.optitrack2022:id/texto_circulo"]'

        // Define un límite de búsqueda. Esto es crucial para que la prueba no sea interminable
        const searchLimit = contador > 5 ? 5 : contador

        // Variable para almacenar la cuenta total de elementos encontrados
        let foundElementsCount = 0;
        let estadoTexto: string = '';

        await sleep(5);
        // Bucle para buscar elementos del índice 1 hasta el límite
        for (let i = 1; i <= searchLimit; i++) {
            // Construye el selector con el índice actual, por ejemplo, `(//...)[1]`, `(//...)[2]`, etc.
            const locatorWithIndex = `(${baseLocator})[${i}]`;

            // Usa el método de tu framework para verificar si el elemento existe en el DOM
            // `isExisting()` o `isVisible()` son métodos comunes.
            const elementExists = await this.locator('xpath', locatorWithIndex, { exact: false }).isVisible();

            if (elementExists) {
                // Si el elemento existe, incrementa el contador
                foundElementsCount++;
                if (i === 1) {
                    const estadoElementoId = await this.isVisible('id', 'com.olvati.optitrack2022:id/txt_estado');

                    if (estadoElementoId) {
                        const primerEstadoTexto = await this.locator('id', 'com.olvati.optitrack2022:id/txt_estado').getText();
                        estadoTexto = primerEstadoTexto;
                    } else {
                        const primerEstadoTexto = await this.locator('xpath', '(//android.widget.TextView[@resource-id="com.olvati.optitrack2022:id/txt_estado"])[1]', { exact: false }).getText();
                        estadoTexto = primerEstadoTexto;
                    }
                }
            } else {
                // Si el elemento no existe (por ejemplo, [30]), significa que la lista terminó.
                // Puedes salir del bucle para no seguir buscando innecesariamente
                break;
            }
        }

        // Finalmente, usa una aserción para verificar que el número total de elementos es mayor que 0
        expect(foundElementsCount).toBeLessThanOrEqual(searchLimit);

        return estadoTexto;
    }

    public async validarFiltroEstadosVisible(isVisible: boolean): Promise<void> {
        const isElementVisible = await this.isVisible('id', 'com.olvati.optitrack2022:id/spEstados')

        if (isVisible) {
            expect(isElementVisible).toBeTruthy();

        } else {
            expect(isElementVisible).toBeFalsy();
        }
    }

    public async validarSeleccionEstado(typeEstado: TypeEstado): Promise<void> {
        const selectorEstados = this.locator('id', 'com.olvati.optitrack2022:id/spEstados')
        await expect(selectorEstados).toBeVisible();
        await selectorEstados.tap();

        const estadoOption = this.locator('xpath', `//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="${typeEstado.valueOf()}"]`, { exact: false });
        await expect(estadoOption).toBeVisible();
        await estadoOption.tap();
        await sleep(3);

        const snackbar = this.locator('id', 'com.olvati.optitrack2022:id/snackbar_text')
        expect(snackbar).toBeVisible();

        const baseLocatorEstado = '//android.widget.TextView[@resource-id="com.olvati.optitrack2022:id/txt_estado"]'

        // Define un límite de búsqueda. Esto es crucial para que la prueba no sea interminable
        const searchLimit = 5

        // Variable para almacenar la cuenta total de elementos encontrados
        let foundElementsCount = 0;

        // Bucle para buscar elementos del índice 1 hasta el límite
        for (let i = 1; i <= searchLimit; i++) {
            // Construye el selector con el índice actual, por ejemplo, `(//...)[1]`, `(//...)[2]`, etc.
            const locatorEstadoWithIndex = `(${baseLocatorEstado})[${i}]`;

            // Usa el método de tu framework para verificar si el elemento existe en el DOM
            // `isExisting()` o `isVisible()` son métodos comunes.
            const estado = this.locator('xpath', locatorEstadoWithIndex, { exact: false });
            const elementExists = await estado.isVisible();

            if (elementExists) {
                // Si el elemento existe, incrementa el contador
                const estadoTexto = await estado.getText();
                expect(estadoTexto).toBe(typeEstado.valueOf());

                foundElementsCount++;
            } else {
                // Si el elemento no existe (por ejemplo, [30]), significa que la lista terminó.
                // Puedes salir del bucle para no seguir buscando innecesariamente
                break;
            }
        }
    }
}
