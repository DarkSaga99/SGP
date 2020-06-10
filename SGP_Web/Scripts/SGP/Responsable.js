
$(document).ready(function () {


    var app = new Vue({
        el: '#app',
        data: {
            dCliente: [],
            dTipoDocumento: [],
            dCargo: [],
            dDistrito: [],
            IdResponsable: '',
            selectedDocumento: 0,
            selectedCliente: '',
            selectedCargo: '',
            selectTipoDocumento: '',
            NroDocumentoModal: '',
            DescripcionModal: '',
            DireccionModal: '',
            tituloModal: 'Nuevo Responsable',
            txtNroDocumento: '',

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
            ListarCliente: function () {
                var data = {
                    flag: 1,
                };
                axios.post('/Cliente/CargaGrilla', data).then(response => {

                    this.dCliente = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarCargo: function () {
                var data = {
                    co_tabla: 8
                };
                axios.post('/TGeneral/CargaTGeneral', data).then(response => {
                    this.dCargo = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            Guardar: function () {

                if (ValidarElementos($('#btnGuardarModal').attr('id'))) {
                    return;
                }
                var DTO = {};
                
                DTO.ti_documento = this.selectedDocumento;
                DTO.nu_documento = $('#txtNroDocumentoModal').val();

                DTO.no_responsable = $('#txtNombreResponsable').val();
                DTO.ap_responsable = $('#txtApellidoPaterno').val();
                DTO.am_responsable = $('#txtApellidoMaterno').val();
                                
                DTO.nu_telefono = $('#txtTelefono').val();
                DTO.de_correo = $('#txtCorreo').val();

                DTO.ti_cargo = this.selectedCargo;
                DTO.co_cliente = this.selectedCliente;
                
                if ($("#rbnActivo").is(':checked')) {
                    DTO.st_responsable = '1'
                } else {
                    DTO.st_responsable = '0'
                }

                let strUrl = "";
                let strMsj = "";

                if (this.IdResponsable == '') {
                    strUrl = "/Responsable/Ins_Responsable";
                    strMsj = "Se grabó correctamente.";
                }
                else {
                    DTO.co_responsable = this.IdResponsable;
                    strUrl = "/Responsable/Upd_Responsable";
                    strMsj = "Se actualizó correctamente.";
                }

                var Datos = {};
                Datos.DTO = DTO;

                axios.post(strUrl, DTO).then(response => {
                    if (response.data == 0) {
                        this.IdResponsable = '';
                        MensajeModal(strMsj, 0);
                        this.Listartabla();
                    } else {
                        MensajeModal(response.data, 2);
                    }
                }).catch(error => {
                    MensajeModal(error, 0);
                    console.log(error)
                    this.errored = true
                });
            },
            Buscar: function () {
                if (!ValidarElementos($('#btnBuscar').attr('id'))) {
                    this.Listartabla();
                }
            },
            Listartabla: function () {

                var Datos = {};
                Datos.no_responsable = $("#txtNombre").val();
                Datos.ti_documento = this.selectTipoDocumento;
                Datos.nu_documento = this.txtNroDocumento;

                var table = null;
                this.clearDatatable();

                axios.post('/Responsable/CargaGrilla', Datos).then(response => {
                    var listData = response.data;
                    if (listData !== "[]") {
                        if ($.fn.dataTable.isDataTable('#tbTabla')) {
                            table = $('#tbTabla').DataTable();
                        }
                        else {
                            var item = 0;
                            table = $('#tbTabla').DataTable({
                                "searching": false,
                                "processing": true,
                                "paging": true,
                                "ordering": false,
                                "info": listData.length < 7 ? false : true,
                                "data": listData,
                                "columns": [
                                { 'data': 'co_responsable', 'className': 'd-none', 'width': '0%' },
                                { 'data': 'NombreCompleto', 'width': '40%' },
                                { 'data': 'no_responsable', 'className': 'd-none', 'width': '0%' },
                                { 'data': 'ap_responsable', 'className': 'd-none', 'width': '0%' },
                                { 'data': 'am_responsable', 'className': 'd-none', 'width': '0%' },
                                { 'data': 'ti_documento', 'className': 'd-none', 'width': '0%' },
                                { 'data': 'tx_valor1', 'width': '10%' },
                                { 'data': 'nu_documento', 'width': '10%' },
                                { 'data': 'co_cliente', 'className': 'd-none', 'width': '0%' },
                                { 'data': 'tx_valor3', 'width': '20%' },
                                { 'data': 'ti_cargo', 'className': 'd-none', 'width': '0%' },
                                { 'data': 'de_padre', 'width': '20%' },                                
                                { 'data': 'st_responsable', 'className': 'd-none', 'width': '0%' },
                                { 'data': 'tx_valor2', 'width': '5%' },
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
                            //eliminar("#tbresponsable tbody", table);
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
                var clearTable = $('#tbTabla').DataTable();
                clearTable.clear();
                $('#tbTabla').empty();
                clearTable.destroy();
            },
            editar: function (data) {
                LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
                this.LimpiarSelect();
                this.tituloModal = 'Editar Responsable';
                this.IdResponsable = data["co_responsable"];

                this.selectedDocumento = data["ti_documento"].trim();
                $('#txtNroDocumentoModal').val(data["nu_documento"]);
                $('#txtNombreResponsable').val(data["no_responsable"]);
                $('#txtApellidoPaterno').val(data["ap_responsable"]);
                $('#txtApellidoMaterno').val(data["am_responsable"]);
                $('#txtTelefono').val(data["nu_telefono"]);
                $('#txtCorreo').val(data["de_correo"]);

                if (data["st_responsable"] == '1') {
                    $("#rbnActivo").prop("checked", true);
                    $("#rbnInactivo").prop("checked", false);
                }
                else {
                    $("#rbnActivo").prop("checked", false);
                    $("#rbnInactivo").prop("checked", true);
                }

                this.selectedCliente = data["co_cliente"];
                this.selectedCargo = data["ti_cargo"].trim();

                $('#exampleModalCenter').modal('show');
                $("#txtNroDocumentoModal").first().focus();

            },
            nuevo: function () {
                LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
                this.LimpiarSelect();
                $('#exampleModalCenter').modal('show');
                this.IdResponsable = '';
            },
            Salir: function () {
                $('#exampleModalCenter').modal('hide');
            },
            eliminar: function (data) {
                this.IdResponsable = data["co_responsable"];
                $('#eliminarModal').modal('show');
            },
            SiModal: function () {
                var DTO = {};
                let strUrl = "";
                let strMsj = "";

                DTO.co_responsable = this.IdResponsable;
                strUrl = "/Responsable/Del_Responsable";
                strMsj = "Se eliminó.";

                axios.post(strUrl, DTO).then(response => {
                    if (response.data == 0) {
                        this.IdResponsable = '';
                        MensajeModal(strMsj, 0);
                        this.Listartabla();
                    } else {
                        MensajeModal(response.data, 2)
                    }
                }).catch(error => {
                    console.log(error)
                    this.errored = true
                });
            },
            LimpiarSelect: function () {
                this.selectedCliente = '',
                this.selectedCargo = '',
                this.selectedDocumento = 0;
                this.selectTipoDocumento = '';
            },
        },
        created: function () {
            this.ListarCliente();
            this.ListarCargo();
            this.Listartabla();
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

    $("#tbTabla").on("click", "button.editar", function () {
        limpiarModal();
        var table = $('#tbTabla').DataTable();
        var data = null;
        if (table.row(this).child.isShown()) {
            data = table.row(this).data();
        } else {
            data = table.row($(this).parents("tr")).data();
        }
        app.editar(data);
    });

    $("#tbTabla").on("click", "button.eliminar", function () {
        var table = $('#tbTabla').DataTable();
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