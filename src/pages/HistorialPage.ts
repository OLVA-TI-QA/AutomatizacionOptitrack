import { Device, expect } from 'appwright';
import { MobileBasePage } from '../pages/base/MobileBasePage';
import { TypeGestiones } from '../types/InterfacesYEnums';

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
    public async filtrarTipoGestiones(typeGestiones: TypeGestiones): Promise<void> {
        const filtroTypeGestionesButton = this.locator('id', 'com.olvati.optitrack2022:id/fab_ingreso_manual');
        await expect(filtroTypeGestionesButton).toBeVisible();
        await filtroTypeGestionesButton.tap();
        await sleep(5);

        switch (typeGestiones) {
            case TypeGestiones.Entregas:
                const entregasOption = this.locator('xpath', '//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="Entregas"]', { exact: false });
                await expect(entregasOption).toBeVisible();
                await entregasOption.tap();

                break;
            case TypeGestiones.Recojos:
                const recojosOption = this.locator('xpath', '//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="Recojos"]', { exact: false });
                await expect(recojosOption).toBeVisible();
                await recojosOption.tap();

                break;
            case TypeGestiones.GuiasLocal:
                const guiaLocalOption = this.locator('xpath', '//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="Guias Local"]', { exact: false });
                await expect(guiaLocalOption).toBeVisible();
                await guiaLocalOption.tap();

                break;
            case TypeGestiones.GuiasNacional:
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
    }

    public async validarFiltroEstados(isVisible: boolean): Promise<void> {
        const filtroEstadosButton = this.locator('id', 'com.olvati.optitrack2022:id/fab_ingreso_manual');


        if (isVisible) {
            // Valida que exista al menos un elemento que coincida con el localizador.
            // Esto es el equivalente a validar que el botón es "visible".
            // La aserción esperará hasta que el conteo sea mayor o igual a 1.
            expect(filtroEstadosButton).toBeGreaterThan(0);
            // Alternativa: await expect(filtroEstadosButton.count()).toBeGreaterThanOrEqual(1);

        } else {
            // Valida que el conteo de elementos sea cero, es decir, que no existe.
            expect(filtroEstadosButton).toEqual(0);
        }
    }
}
