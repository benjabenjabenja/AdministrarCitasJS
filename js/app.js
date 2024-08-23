(() => {
    // ---------------------------------------------------------------------------- //
    // CONSTANTES                                                                   //
    // ---------------------------------------------------------------------------- //
    const ESTADO_VALIDACION = Object.freeze({
        EXITO: 'EXITO',
        ERROR: 'ERROR',
    });
    const MENSAJES_VALIDACION = Object.freeze({
        CAMPOS_OBLIGATORIOS: 'Todos los campos son obligatorios',
        EMAIL_VALIDO: 'El campo `Email` tiene que ser un email válido.',
        EXITOSO: 'Validacion exitosa.'
    });
    const CLASSLIST_ERROR = Object.freeze(['text-center', 'w-full', 'p-3',
        'text-white', 'my-5', 'alerta', 'uppercase', 'font-bold', 'text-sm']);
    const CLASSLIST_DIV_CITAS = ['mx-5', 'my-10', 'bg-white', 'show-md', 'px-5', 'py-10', 'rounded-md'];
    const CLASSLIST_ROW = ['font-normal', 'mb-3', 'text-gray-700', 'normal-case'];
    const CLASSLIST_BTN = ['py-2', 'px-10', 'text-white',
        'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2'];
    const CLASSLIST_CONTENEDOR_BTNS = ['flex', 'items-center', 'gap-2'];
    const BACKGROUND_BTN_EDITAR = ['bg-indigo-600', 'hover:bg-indigo-700'];
    const BACKGROUND_BTN_ELIMINAR = ['bg-red-600', 'hover:bg-red-700'];
    const BACKGROUND_ERROR = 'bg-red-500';
    const BACKGROUND_EXITO = 'bg-green-500';
    const ESTADO_FORMULARIO = Object.freeze({
        paciente: '',
        propietario: '',
        email: '',
        fecha: '',
        sintomas: ''
    });
    const ID_NOTIFICACION = Object.freeze({
        HASHTAG: '#alerta-notificacion',
        SIN_HASHTAG: 'alerta-notificacion',
    });
    const TIEMPO_ALERTA = 2500;

    // ---------------------------------------------------------------------------- //
    // CLASES                                                                       //
    // ---------------------------------------------------------------------------- //
    class Notificacion {
        constructor({ mensaje, tipo }) {
            this.mensaje = mensaje;
            this.tipo = tipo;
        }
        /**
         * Muestra el mensaje con el que se instacio la clase.
         */
        mostrar() {
            // creo el elemento
            const notificacion = document.createElement('div');
            notificacion.setAttribute('id', ID_NOTIFICACION.SIN_HASHTAG);
            notificacion.classList.add(...CLASSLIST_ERROR);

            // asigno el tipo de notificacion
            this.tipo === ESTADO_VALIDACION.ERROR ?
                notificacion.classList.add(BACKGROUND_ERROR) :
                notificacion.classList.add(BACKGROUND_EXITO);
            
            // agrego mensaje
            notificacion.textContent = this.mensaje;

            // incercion de alerta:
            // verifico que no exista la notificacion y la inserto
            const alertaExistente = document.querySelector(ID_NOTIFICACION.HASHTAG);
            alertaExistente?.remove();
            formulario.parentElement.insertBefore(notificacion, formulario);

            // callback para eliminar la notificacion
            const cb = () => {
                notificacion.remove();
            };
            // despues de 1.5 segundos, la elimino
            setTimeout(cb, TIEMPO_ALERTA);
        }
    };

    class AdministradorCitas {
        constructor() {
            this.citas = [];
        }
        /**
         * Agrega una cita al arreglo.
         * @param {ESTADO_FORMULARIO} cita 
         */
        agregar(cita) {
            this.citas = [...this.citas, cita];
            this.mostrar();
        }
        /**
         * Muestra las citas o un mensaje por default.
         */
        mostrar() {
            // limpiar HTML anterior.
            while (citasContenedor.firstChild) {
                citasContenedor.removeChild(citasContenedor.firstChild);
            };

            // generar citas
            this.citas.forEach(cita => {
                const divCita = document.createElement('DIV');
                divCita.classList.add(...CLASSLIST_DIV_CITAS);

                // rows:
                // paciente
                const paciente = document.createElement('P');
                paciente.classList.add(...CLASSLIST_ROW);
                paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita && (cita.paciente ?? '-')}`
                // propietario
                const propietario = document.createElement('P');
                propietario.classList.add(...CLASSLIST_ROW);
                propietario.innerHTML = `<span class="font-bold uppercase"> Propietario: </span> ${cita && (cita.propietario ?? '-')}`
                // email
                const email = document.createElement('P');
                email.classList.add(...CLASSLIST_ROW);
                email.innerHTML = `<span class="font-bold uppercase">Contacto: </span> ${cita && (cita.email ?? '-')}`
                // fechas
                const fecha = document.createElement('P');
                fecha.classList.add(...CLASSLIST_ROW);
                fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita && (cita.fecha ?? '-')}`
                // sintomas
                const sintomas = document.createElement('P');
                sintomas.classList.add(...CLASSLIST_ROW);
                sintomas.innerHTML = `<span class="font-bold uppercase">Sintomas: </span> ${cita && (cita.sintomas ?? '-')}`
            
                // agregado de acciones:
                // boton editar
                const btnEditar = document.createElement('BUTTON');
                btnEditar.classList.add(...CLASSLIST_BTN, ...BACKGROUND_BTN_EDITAR);
                btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
                // boton eliminar
                const btnEliminar = document.createElement('BUTTON');
                btnEliminar.classList.add(...CLASSLIST_BTN, ...BACKGROUND_BTN_ELIMINAR);
                btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
                
                const contenedorBotones = document.createElement('DIV');
                contenedorBotones.classList.add(...CLASSLIST_CONTENEDOR_BTNS);
                contenedorBotones.appendChild(btnEditar);
                contenedorBotones.appendChild(btnEliminar);
                // insertar paciente
                divCita.append(paciente);
                divCita.append(propietario);
                divCita.append(email);
                divCita.append(fecha);
                divCita.append(sintomas);
                divCita.append(contenedorBotones);

                // inserto las rows al contenedor
                citasContenedor.appendChild(divCita);
            });
        }
    };

    // ---------------------------------------------------------------------------- //
    // INPUTS / FORMULARIO                                                          //
    // ---------------------------------------------------------------------------- //
    const inputPaciente = document.querySelector('#paciente');
    const inputPropietario = document.querySelector('#propietario');
    const inputEmail = document.querySelector('#email');
    const inputFecha = document.querySelector('#fecha');
    const inputSintomas = document.querySelector('#sintomas');
    //formulario
    const formulario = document.querySelector('#formulario-cita');
    // contenedor citas
    const citasContenedor = document.querySelector('#citas');
    
    // Objecto de cita
    const valorCita = { ...ESTADO_FORMULARIO };

    // LISTENERS - inputs `borrar`?
    inputPaciente.addEventListener('change', escribirObjeto);
    inputPropietario.addEventListener('change', escribirObjeto);
    inputEmail.addEventListener('change', escribirObjeto);
    inputFecha.addEventListener('change', escribirObjeto);
    inputSintomas.addEventListener('change', escribirObjeto);

    // LISTENERS - formulario
    // formulario?.addEventListener('change', escribirObjeto);
    formulario?.addEventListener('submit', enviarFormulario);

    const citas = new AdministradorCitas();

    // ---------------------------------------------------------------------------- //
    // FUNCIONES                                                                    //
    // ---------------------------------------------------------------------------- //
    /**
     * Escribe en la propiedad del formulario.
     * @param {EventTarget} evento 
     */
    function escribirObjeto(evento) {
        evento.preventDefault();
        const { name, value } = evento.target;
        valorCita[name] = value;
    };
    /**
     * Envia el formulario al backend.
     * @param {EventTarget} evento 
     */
    function enviarFormulario(evento) {
        evento.preventDefault();
        // valido los campos
        const respuesta = validarFormulario(evento);

        // creo notificacion 
        const notificacion = new Notificacion({
            tipo: respuesta.validacion,
            mensaje: respuesta.mensaje,
        });
        // muestro el la respuesta
        notificacion.mostrar();

        if (respuesta.validacion === ESTADO_VALIDACION.EXITO) {
            // guardo la cita en el arreglo
            citas.agregar({...valorCita});
            reiniciarFormulario();
        }
    }
    /**
     * Retorna si el formulario paso o no la validacion y su correspondiente mensaje.
     * @param {EventTarget} evento 
     * @returns {{ validacion: ESTADO_VALIDACION, mensaje: string }} respuesta de la validacion
     */
    function validarFormulario(evento) {
        evento.preventDefault();

        // validar campos
        const respuesta = {
            validacion: ESTADO_VALIDACION.ERROR,
            mensaje: '',
        };

        const { email } = valorCita;

        // formulario vacio
        if ( Object.values(valorCita).some(v => v.trim() === '') ) {
            return {
                ...respuesta,
                mensaje: MENSAJES_VALIDACION.CAMPOS_OBLIGATORIOS,
            };
        };
        // email valido
        const regExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!regExp.test(email)) {
            return {
                ...respuesta,
                mensaje: MENSAJES_VALIDACION.EMAIL_VALIDO,
            };
        }
        // respuesta exitosa
        return {
            validacion: ESTADO_VALIDACION.EXITO,
            mensaje: MENSAJES_VALIDACION.EXITOSO,
        };
    }
    /**
     * Reinicia el valor del formulario.
     */
    function reiniciarFormulario() {
        // reinicio de formulario
        formulario.reset();
        // reinicio de objeto estado formulario
        Object.assign(valorCita, ESTADO_FORMULARIO);
    };
})();
