$(document).ready(function () {

    var app = new Vue({
        el: '#appMenu',
        data: {
            dMenuBusqueda: [],
            dTipoDocumento: [],
            dProvincia: [],
            dDistrito: [],
            IdMenu: '',
            selectedMenuBusqueda: '',
            NroDocumentoModal: '',
            DescripcionModal: '',
            DireccionModal: '',
            tituloModal: 'Nuevo Menu',
            txtNroDocumento: '',
            txtNombre: '',
        },
        methods: {
            ListaMenuPadres: function () {
                var data = {
                    co_tabla: 1
                };
                axios.post('/Menu/CargaTGeneral', data).then(response => {
                    this.dTipoDocumento = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            GuardarMenu: function () {

                if (ValidarElementos($('#btnGuardarModal').attr('id'))) {
                    return;
                }
                var DTO = {};
                DTO.de_menu = $('#txtDescripcionModal').val();
                DTO.nu_documento = $('#txtNroDocumentoModal').val();
                DTO.di_menu = $('#txtDireccionModal').val();
                DTO.co_ubigeo = this.selectedDistrito;

                if ($("#rbnActivo").is(':checked')) {
                    DTO.st_menu = '1'
                } else {
                    DTO.st_menu = '0'
                }

                let strUrl = "";
                let strMsj = "";

                if (this.IdMenu == '') {
                    strUrl = "/Menu/Ins_Menu";
                    strMsj = "Se grabó correctamente.";
                }
                else {
                    DTO.co_menu = this.IdMenu;
                    strUrl = "/Menu/Upd_Menu";
                    strMsj = "Se actualizó correctamente.";
                }

                var Datos = {};
                Datos.DTO = DTO;

                axios.post(strUrl, DTO).then(response => {
                    if (response.data == 0) {
                        this.IdMenu = '';
                        MensajeModal(strMsj, 0);
                        this.ListarMenu();
                    } else {
                        MensajeModal(response.data, 2);
                    }
                }).catch(error => {
                    MensajeModal(error, 0);
                    console.log(error)
                    this.errored = true
                });
            },
            BuscarMenu: function () {
                this.ListarMenu();
            },
            ListarMenu: function () {

                var Datos = {};
                Datos.de_menu = this.txtNombre;

                var table = null;
                this.clearDatatable();

                axios.post('/Menu/CargaGrilla', Datos).then(response => {
                    var listData = response.data;
                    if (listData !== "[]") {
                        if ($.fn.dataTable.isDataTable('#tbMenu')) {
                            table = $('#tbMenu').DataTable();
                        }
                        else {
                            var item = 0;
                            table = $('#tbMenu').DataTable({
                                "searching": false,
                                "processing": true,
                                "paging": true,
                                "ordering": false,
                                "info": listData.length < 7 ? false : true,
                                "data": listData,
                                "columns": [
                                { 'data': 'co_menu', 'className': 'd-none', 'width': '0%' },
                                { 'data': 'de_menu', 'width': '30%' },
                                { 'data': 'nr_padre', 'className': 'd-none', 'width': '0%' },
                                { 'data': 'nr_hijo', 'width': '5%' },
                                { 'data': 'nr_posicion', 'width': '5%' },
                                { 'data': 'de_icono', 'width': '60%' },
                                { 'data': 'de_url', 'className': 'd-none', 'width': '0%' },
                                {
                                    "render": function () {
                                        return '<button type="button" id="ButtonEditar" class="editar edit-modal btn btn-warning botonEditar" ><span class="fas fa-pencil-alt"></span></button>';
                                    }
                                },
                                {
                                    "render": function () {
                                        return '<button type="button" id="ButtonEliminar" class="eliminar edit-modal btn btn-danger botonEliminar"><span class="fas fa-trash-alt"></span></button>';
                                    }
                                },
                                ],
                                "language": {
                                    "sProcessing": "Procesando...",
                                    "sLengthMenu": "",
                                    "sZeroRecords": "No se encontraron resultados",
                                    "sEmptyTable": "Ningún dato disponible en esta tabla",
                                    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                                    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                                    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                                    "sInfoPostFix": "",
                                    "sSearch": "Ingrese palabra clave para filtrar:",
                                    "sUrl": "",
                                    "sInfoThousands": ",",
                                    "sLoadingRecords": "Cargando...",
                                    "oPaginate": {
                                        "sFirst": "Primero",
                                        "sLast": "Último",
                                        "sNext": "Siguiente",
                                        "sPrevious": "Anterior"
                                    },
                                    "oAria": {
                                        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                                    }
                                }
                            });
                            //eliminar("#tbMenu tbody", table);
                        }

                    } else {
                        this.clearDatatable();
                    }


                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });

            },
            clearDatatable: function () {
                var clearTable = $('#tbMenu').DataTable();
                clearTable.clear();
                $('#tbMenu').empty();
                clearTable.destroy();
            },
            editar: function (data) {
                LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
                this.LimpiarSelect();
                this.tituloModal = 'Editar Menu';
                this.IdMenu = data["co_menu"];

                $('#txtNroDocumentoModal').val(data["nu_documento"]);
                $('#txtDescripcionModal').val(data["de_menu"]);
                $('#txtDireccionModal').val(data["di_menu"]);

                if (data["st_menu"] == 'SI') {
                    $("#rbnActivo").prop("checked", true);
                    $("#rbnInactivo").prop("checked", false);
                }
                else {
                    $("#rbnActivo").prop("checked", false);
                    $("#rbnInactivo").prop("checked", true);
                }

                this.selectedDepartamento = data["co_ubigeo"].substr(0, 2).padEnd(6, '0'),
                this.selectedProvincia = data["co_ubigeo"].substr(0, 4).padEnd(6, '0'),
                this.selectedDistrito = data["co_ubigeo"],
                this.ListarProvincia();

                $('#exampleModalCenter').modal('show');
                $("#txtNroDocumentoModal").first().focus();

            },
            nuevo: function () {
                LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
                this.LimpiarSelect();
                $('#exampleModalCenter').modal('show');
                this.IdMenu = '';
            },
            Salir: function () {
                $('#exampleModalCenter').modal('hide');
            },
            eliminar: function (data) {
                this.IdMenu = data["co_menu"];
                $('#eliminarModal').modal('show');
            },
            SiModal: function () {
                var DTO = {};
                let strUrl = "";
                let strMsj = "";

                DTO.co_menu = this.IdMenu;
                strUrl = "/Menu/Del_Menu";
                strMsj = "Se eliminó";

                axios.post(strUrl, DTO).then(response => {
                    if (response.data == 0) {
                        this.IdMenu = '';
                        MensajeModal(strMsj, 0);
                        this.ListarMenu();
                    } else {
                        MensajeModal(response.data, 2)
                    }
                }).catch(error => {
                    console.log(error)
                    this.errored = true
                });
            },
            LimpiarSelect: function () {
                this.selectedDepartamento = '';
                this.selectedProvincia = '';
                this.selectedDistrito = '';
                this.selectTipoDocumento = '';
            },
        },
        created: function () {
            this.ListarDepartamento();
            this.ListarMenu();
            this.ListaTipoDocumento();
        },
    });


    var appFormulario = new Vue({
        el: '#appToast',
        data: {
            ListaToast: [],
            CssShow: '',
        },
        methods: {
            mostrarmensaje: function () {
                alert('Llamar otro Vue');
            },
        }
    });

    $("#tbMenu").on("click", "button.editar", function () {
        limpiarModal();
        var table = $('#tbMenu').DataTable();
        var data = null;
        if (table.row(this).child.isShown()) {
            data = table.row(this).data();
        } else {
            data = table.row($(this).parents("tr")).data();
        }
        app.editar(data);
    });

    $("#tbMenu").on("click", "button.eliminar", function () {
        var table = $('#tbMenu').DataTable();
        if (table.row(this).child.isShown()) {
            var data = table.row(this).data();
        } else {
            var data = table.row($(this).parents("tr")).data();
        }
        app.eliminar(data);

    });

    var limpiarModal = function () {
        $('#hidIdCliente').val("");
        $('#txtNroDocumentoModal').val("");
        $('#txtNombreModal').val("");
        $('#txtDireccionModal').val("");
        $("#rbnActivo").prop("checked", true);
    }





});