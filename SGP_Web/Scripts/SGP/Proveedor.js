
$(document).ready(function () {


    var app = new Vue({
        el: '#app',
        data: {
            dDepartamentos: [],
            dTipoDocumento: [],
            dProvincia: [],
            dDistrito: [],
            IdProveedor: '',
            selectedDepartamento: '',
            selectedProvincia: '',
            selectedDistrito: '',
            selectedDocumento: '',
            selectTipoDocumento: '',
            NroDocumentoModal: '',
            DescripcionModal: '',
            DireccionModal: '',
            tituloModal: 'Nuevo Proveedor',
            txtNombre: '',

        },
        methods: {
            ListaTipoDocumento: function () {
                var data = {
                    co_tabla: 1
                };
                axios.post('/TGeneral/CargaTGeneral', data).then(response => {
                    this.dTipoDocumento = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarDepartamento: function () {
                var data = {
                    flag: 1,
                };
                axios.post('/Ubigeo/CargaComboUbigeo', data).then(response => {

                    this.dDepartamentos = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarProvincia: function () {
                var data = {
                    flag: 2,
                    co_ubigeo: this.selectedDepartamento
                };
                axios.post('/Ubigeo/CargaComboUbigeo', data).then(response => {
                    this.dProvincia = response.data;
                    this.ListarDistrito();
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarDistrito: function () {
                var data = {
                    flag: 3,
                    co_ubigeo: this.selectedProvincia
                };
                axios.post('/Ubigeo/CargaComboUbigeo', data).then(response => {
                    this.dDistrito = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            GuardarProveedor: function () {

                if (ValidarElementos($('#btnGuardarModal').attr('id'))) {
                    return;
                }
                var DTO = {};
                DTO.de_proveedor = $('#txtDescripcionModal').val();
                DTO.ti_documento = this.selectedDocumento;
                DTO.nu_documento = $('#txtNroDocumentoModal').val();
                DTO.di_proveedor = $('#txtDireccionModal').val();
                DTO.co_ubigeo = this.selectedDistrito;

                if ($("#rbnActivo").is(':checked')) {
                    DTO.st_proveedor = '1'
                } else {
                    DTO.st_proveedor = '0'
                }

                let strUrl = "";
                let strMsj = "";

                if (this.IdProveedor == '') {
                    strUrl = "/Proveedor/Ins_Proveedor";
                    strMsj = "Se grabó correctamente.";
                }
                else {
                    DTO.co_proveedor = this.IdProveedor;
                    strUrl = "/Proveedor/Upd_Proveedor";
                    strMsj = "Se actualizó correctamente.";
                }

                var Datos = {};
                Datos.DTO = DTO;

                axios.post(strUrl, DTO).then(response => {
                    if (response.data == 0) {                        
                        this.IdProveedor = '';                        
                        MensajeModal(strMsj, 0);
                        this.ListarProveedor();
                    } else {
                        MensajeModal(response.data, 2);
                    }
                }).catch(error => {
                    MensajeModal(error, 0);
                    console.log(error)
                    this.errored = true
                });
            },
            BuscarProveedor: function () {                
                if (!ValidarElementos($('#btnBuscar').attr('id'))) {
                    this.ListarProveedor();
                }
            },
            ListarProveedor: function () {

                var Datos = {};
                Datos.de_proveedor = this.txtNombre;
                Datos.ti_documento = this.selectTipoDocumento;
                Datos.nu_documento = $('#txtNroDocumento').val(); 

                var table = null;
                this.clearDatatable();

                axios.post('/Proveedor/CargaGrilla', Datos).then(response => {
                    var listData = response.data;
                    if (listData !== "[]") {
                        if ($.fn.dataTable.isDataTable('#tbProveedor')) {
                            table = $('#tbProveedor').DataTable();
                        }
                        else {
                            var item = 0;
                            table = $('#tbProveedor').DataTable({
                                "searching": false,
                                "processing": true,
                                "paging": true,
                                "ordering": false,
                                "info": listData.length < 7 ? false : true,
                                "data": listData,
                                "columns": [
                                { 'data': 'co_proveedor', 'className': 'd-none', 'width': '0%' },
                                { 'data': 'de_proveedor', 'width': '30%' },
                                { 'data': 'ti_documento', 'className': 'd-none', 'width': '0%' },
                                { 'data': 'de_tabla', 'width': '5%' },
                                { 'data': 'nu_documento', 'width': '5%' },
                                { 'data': 'di_proveedor', 'width': '60%' },
                                { 'data': 'st_proveedor', 'className': 'd-none', 'width': '0%' },
                                { 'data': 'tx_valor1', 'width': '5%' },
                                { 'data': 'co_ubigeo', 'className': 'd-none', 'width': '0%' },
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
                            //eliminar("#tbProveedor tbody", table);
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
                var clearTable = $('#tbProveedor').DataTable();
                clearTable.clear();
                $('#tbProveedor').empty();
                clearTable.destroy();
            },
            editar: function (data) {
                LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
                this.LimpiarSelect();
                this.tituloModal = 'Editar Proveedor';
                this.IdProveedor = data["co_proveedor"];

                this.selectedDocumento = data["ti_documento"].trim();
                $('#txtNroDocumentoModal').val(data["nu_documento"]);
                $('#txtDescripcionModal').val(data["de_proveedor"]);
                $('#txtDireccionModal').val(data["di_proveedor"]);

                if (data["st_proveedor"] == 'SI') {
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
                this.IdProveedor = '';
            },
            Salir: function () {
                $('#exampleModalCenter').modal('hide');
            },
            eliminar: function (data) {
                this.IdProveedor = data["co_proveedor"];
                $('#eliminarModal').modal('show');
            },
            SiModal: function () {
                var DTO = {};
                let strUrl = "";
                let strMsj = "";

                DTO.co_proveedor = this.IdProveedor;
                strUrl = "/Proveedor/Del_Proveedor";
                strMsj = "Se eliminó.";

                axios.post(strUrl, DTO).then(response => {
                    if (response.data == 0) {                       
                        this.IdProveedor = '';
                        MensajeModal(strMsj, 0);
                        this.ListarProveedor();
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
                this.selectedDocumento = 0;
                this.selectTipoDocumento = '';
            },
        },
        created: function () {
            this.ListarDepartamento();
            this.ListarProveedor();
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

    $("#tbProveedor").on("click", "button.editar", function () {
        limpiarModal();
        var table = $('#tbProveedor').DataTable();
        var data = null;
        if (table.row(this).child.isShown()) {
            data = table.row(this).data();
        } else {
            data = table.row($(this).parents("tr")).data();
        }
        app.editar(data);
    });

    $("#tbProveedor").on("click", "button.eliminar", function () {
        var table = $('#tbProveedor').DataTable();
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