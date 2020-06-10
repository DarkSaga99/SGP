$(document).ready(function () {



    var app = new Vue({
        el: '#app',
        data: {
            dDepartamentos: [],
            dTipoDocumento: [],
            dProvincia: [],
            dDistrito: [],
            dArea: [],
            dMoneda: [],
            IdRecurso: '',
            selectedDepartamento: '',
            selectedProvincia: '',
            selectedDistrito: '',
            selectedDocumento: 0,
            selectTipoDocumento: '',
            selectArea: '',
            selectMoneda: '',
            NroDocumentoModal: '',
            DescripcionModal: '',
            DireccionModal: '',
            tituloModal: 'Nuevo Recurso',
            txtNroDocumento: '',
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
            ListarArea: function () {
                var data = {
                    st_area: 1,
                };
                axios.post('/Area/Sel_Area', data).then(response => {
                    this.dArea = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarMoneda: function () {
                var data = {
                    st_moneda: 1,
                };
                axios.post('/Moneda/Sel_Moneda', data).then(response => {
                    this.dMoneda = response.data;
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
                //DTO.de_recurso = $("#txtRecursoModal").val();
                DTO.no_recurso = $("#txtNombreModal").val();
                DTO.ap_recurso = $("#txtApellidoPaternoModal").val();
                DTO.am_recurso = $("#txtApellidoMaternoModal").val();
                DTO.ti_documento = this.selectedDocumento;
                DTO.nu_documento = $("#txtNroDocumentoModal").val();
                DTO.fe_ingreso =$("#dtRegistroModal").val();
                DTO.co_area = this.selectArea;
                DTO.co_moneda = this.selectMoneda;
                DTO.mo_tarifa = $("#txtTarifaModal").val().replace(',','');
                DTO.di_recurso = $("#txtDireccionModal").val();
                DTO.tf_recurso = $("#txtTelefonoModal").val();
                DTO.co_ubigeo = this.selectedDistrito;
                DTO.fe_cese = $("#dtCeseModal").val();

                if ($("#rbnActivo").is(':checked')) {
                    DTO.st_recurso = '1';
                } else {
                    DTO.st_recurso = '0';
                }

                if (this.IdRecurso == '') {
                    strUrl = "/Recurso/Ins_Recurso";
                    strMsj = "Se grabó correctamente.";
                }
                else {
                    DTO.co_Recurso = this.IdRecurso;
                    strUrl = "/Recurso/Upd_Recurso";
                    strMsj = "Se actualizó correctamente.";
                }

                var Datos = {};
                Datos.DTO = DTO;

                axios.post(strUrl, DTO).then(response => {
                    if (response.data == 0) {
                        if ($('#txtImagenRecurso').val() != '') {
                            this.SubirImagenes(this.IdRecurso);
                        } else {
                            this.ListarTabla();
                        }
                        this.IdRecurso = '';
                        MensajeModal(strMsj, 0);

                    } else {
                        MensajeModal(response.data, 2);
                    }
                }).catch(error => {
                    MensajeModal(error, 1);
                    console.log(error)
                    this.errored = true
                });
            },
            SubirImagenes: function (IdRecurso) {
                var formData = new FormData();
                var totalFiles = document.getElementById("txtImagenRecurso").files.length;
                for (var i = 0; i < totalFiles; i++) {
                    var file = document.getElementById("txtImagenRecurso").files[i];
                    formData.append("imageUploadForm", file);
                }
                $('#txtImagenRecurso').val('');
                axios.post("/Recurso/SubirImagen", formData).then(response => {
                    if (response.data == "") {
                        this.ListarTabla();
                    }
                }).catch(error => {
                    MensajeModal(error, 1);
                    console.log(error)
                    this.errored = true
                });

            },
            Buscar: function () {
                if (!ValidarElementos($('#btnBuscar').attr('id'))) {
                    this.ListarTabla();
                }
            },
            ListarTabla: function () {

                var Datos = {};
                Datos.de_recurso = $('#txtNombre').val();
                Datos.ti_documento = $('#cboTipoDocumento').val();
                Datos.nu_documento = $('#txtNroDocumento').val();


                var table = null;
                this.clearDatatable();


                axios.post('/Recurso/CargaGrilla', Datos).then(response => {
                    var listData = response.data;
                    if (listData !== "[]") {
                        if ($.fn.dataTable.isDataTable('#tbPrincipal')) {
                            table = $('#tbPrincipal').DataTable();

                        }
                        else {
                            var item = 0;
                            table = $('#tbPrincipal').DataTable({
                                "searching": false,
                                "processing": true,
                                "paging": false,
                                "ordering": false,
                                "info": listData.length < 7 ? false : true,
                                "data": listData,
                                "columns": [
                                { 'data': 'co_recurso', 'className': 'hiddeColumn ', 'width': '0%' },
                                { 'data': 'ti_documento', 'className': 'hiddeColumn', 'width': '0%' },
                                { 'data': 'de_tabla', 'width': '10%' },
                                { 'data': 'nu_documento', 'width': '10%' },
                                { 'data': 'de_recurso', 'width': '60%' },
                                { 'data': 'no_recurso', 'className': 'hiddeColumn' },
                                { 'data': 'ap_recurso', 'className': 'hiddeColumn' },
                                { 'data': 'am_recurso', 'className': 'hiddeColumn' },
                                { 'data': 'di_recurso', 'className': 'hiddeColumn', 'width': '0%' },
                                { 'data': 'co_area', 'className': 'hiddeColumn', 'width': '0%' },
                                { 'data': 'de_area', 'width': '5%' },
                                { 'data': 'fe_ingreso', 'width': '5%' },
                                { 'data': 'fe_cese', 'width': '5%' },
                                { 'data': 'co_moneda', 'className': 'hiddeColumn', 'width': '0%' },
                                { 'data': 'de_moneda', 'className': 'hiddeColumn', 'width': '0%' },
                                { 'data': 'mo_tarifa', 'className': 'hiddeColumn', 'width': '0%' },
                                { 'data': 'tf_recurso', 'className': 'hiddeColumn', 'width': '0%' },
                                { 'data': 'st_recurso', 'className': 'hiddeColumn', 'width': '0%' },
                                { 'data': 'tx_valor1', 'width': '5%' },
                                { 'data': 'co_ubigeo', 'className': 'hiddeColumn', 'width': '0%' },
                                {
                                    "render": function (data, type, row, meta) {
                                        return $('<a class="ModalClass fas fa-angry fa-2x" data-img=' + '"' + row["URLImagenRecurso"] + '"' + '/>')
                                                    .wrap('<center></center>')
                                                    .parent()
                                                    .html();
                                    },
                                    className: "Column-Center"
                                },
                                  //{
                                  //    "render": function (data, type, row, meta) {
                                  //        return $('<a class="fas fa-angry fa-2x" data-toggle="tooltip" />')
                                  //                 .attr('title', $('<img/>').attr('src', row["URLImagenRecurso"]).attr('width', '200x').attr('height', 'auto').wrap('<div></div>').parent().html())
                                  //                 .wrap('<center></center>')
                                  //                 .parent()
                                  //                 .html();
                                  //    },
                                  //    className: "Column-Center"
                                  //},
                                {
                                    "render": function () {
                                        return '<button type="button" id="ButtonEditar" class="editar edit-modal btn btn-warning botonEditar"><span class="fas fa-pencil-alt"></span></button>';
                                    },
                                    className: "Column-Center"
                                },
                                {
                                    "render": function () {
                                        return '<button type="button" id="ButtonEliminar" class="eliminar edit-modal btn btn-danger botonEliminar"><span class="fas fa-trash-alt"></span></button>';
                                    },
                                    className: "Column-Center"
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
                            //eliminar("#tbRecurso tbody", table);
                            //$('[data-toggle="tooltip"]').tooltip({
                            //    html: true
                            //});

                            $('.ModalClass').click(function (e) {


                                var table = $('#tbPrincipal').DataTable();
                                var data = null;
                                if (table.row(this).child.isShown()) {
                                    data = table.row(this).data();
                                } else {
                                    data = table.row($(this).parents("tr")).data();
                                }
                                var Datos = {};
                                var imgFoto = '';
                                Datos.nu_documento = data.nu_documento
                                axios.post('/Recurso/ObtenerFoto', Datos).then(response => {
                                    imgFoto = response.data;
                                    $("#DivModalImagen").show();
                                    $('#ImgModal').attr('src', imgFoto);
                                    $("#caption").html($('#myImg').attr('alt'));

                                    $('.CerrarModalImg , #DivModalImagen').click(function () {
                                        $("#DivModalImagen").hide();
                                    });

                                }).catch(error => {
                                    console.log(error);
                                    this.errored = true;
                                });

                                //$(".popup").css({ left: e.pageX-300 });
                                //$(".popup").css({ top: e.pageY });
                                //$(".popup").show();
                                
                            });

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
                var clearTable = $('#tbPrincipal').DataTable();
                clearTable.clear();
                $('#tbPrincipal').empty();
                clearTable.destroy();
            },
            editar: function (data) {

                var Datos = {};;
                Datos.nu_documento = data["nu_documento"];
                axios.post('/Recurso/ObtenerFoto', Datos).then(response => {
                    LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
                    this.LimpiarSelect();
                    this.tituloModal = 'Editar Recurso';
                    this.IdRecurso = data["co_recurso"];

                    this.selectedDocumento = data["ti_documento"].trim();
                    $("#txtNroDocumentoModal").val(data["nu_documento"]);
                    //$('#txtRecursoModal').val(data["de_recurso"]);
                    $('#txtNombreModal').val(data["no_recurso"]);
                    $('#txtApellidoPaternoModal').val(data["ap_recurso"]);
                    $('#txtApellidoMaternoModal').val(data["am_recurso"]);

                    $('#dtRegistroModal').val(data["fe_ingreso"]);
                    $('#dtCeseModal').val(data["fe_cese"]);

                    $('#txtDireccionModal').val(data["di_recurso"]);

                    $('#txtTelefonoModal').val(data["tf_recurso"]);
                    $('#txtTarifaModal').val(data["mo_tarifa"]);

                    $('#imgSalida').attr('src', response.data);

                    if (data["st_recurso"] == '1') {
                        $("#rbnActivo").prop("checked", true);
                        $("#rbnInactivo").prop("checked", false);
                    }
                    else {
                        $("#rbnActivo").prop("checked", false);
                        $("#rbnInactivo").prop("checked", true);
                    }
                    this.selectArea = data["co_area"];
                    this.selectMoneda = data['co_moneda'];
                    this.selectedDepartamento = data["co_ubigeo"].substr(0, 2).padEnd(6, '0'),
                    this.selectedProvincia = data["co_ubigeo"].substr(0, 4).padEnd(6, '0'),
                    this.selectedDistrito = data["co_ubigeo"],
                    this.ListarProvincia();

                    $('#exampleModalCenter').modal('show');
                    $("#txtNroDocumentoModal").first().focus();

                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });

            },
            nuevo: function () {
                LimpiarFormularioModal($('#btnGuardarModal').attr('id'));
                this.LimpiarSelect();
                $('#exampleModalCenter').modal('show');
                this.IdRecurso = '';
            },
            Salir: function () {
                $('#exampleModalCenter').modal('hide');
            },
            eliminar: function (data) {

                this.IdRecurso = data["co_recurso"];
                $('#eliminarModal').modal('show');
            },
            SiModal: function () {
                var DTO = {};
                let strUrl = "";
                let strMsj = "";

                DTO.co_Recurso = this.IdRecurso;
                strUrl = "/Recurso/Del_Recurso";
                strMsj = "Se eliminó.";

                axios.post(strUrl, DTO).then(response => {
                    if (response.data == 0) {
                        this.IdRecurso = '';
                        MensajeModal('Se elimino correctamente.', 0);
                        this.ListarTabla();
                    } else {
                        MensajeModal(response.data, 2);
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
                this.selectArea = '';
                this.selectMoneda = '';
            },
        },
        created: function () {
            this.ListarDepartamento();
            this.ListarTabla();
            this.ListaTipoDocumento();
            this.ListarArea();
            this.ListarMoneda();
        },
    });

    $("#tbPrincipal").on("click", "button.editar", function () {
        limpiarModal();
        var table = $('#tbPrincipal').DataTable();
        var data = null;
        if (table.row(this).child.isShown()) {
            data = table.row(this).data();
        } else {
            data = table.row($(this).parents("tr")).data();
        }
        app.editar(data);
    });

    $("#tbPrincipal").on("click", "button.eliminar", function () {
        var table = $('#tbPrincipal').DataTable();
        if (table.row(this).child.isShown()) {
            var data = table.row(this).data();
        } else {
            var data = table.row($(this).parents("tr")).data();
        }
        app.eliminar(data);

    });

    var limpiarModal = function () {
        $('#hidIdRecurso').val("");
        $('#txtNroDocumentoModal').val("");
        $('#txtNombreModal').val("");
        $('#txtDireccionModal').val("");
        $("#rbnActivo").prop("checked", true);
    }


    $('#dtRegistroModal').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: "es",
    }).on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        $('#dtCeseModal').datepicker('setStartDate', minDate);
    });

    $('#dtCeseModal').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: "es",
    });


    $('#txtImagenRecurso').change(function (e) {
        addImage(e);
    });

    function addImage(e) {
        var file = e.target.files[0],
        imageType = /image.*/;

        if (!file.type.match(imageType))
            return;

        var reader = new FileReader();
        reader.onload = fileOnload;
        reader.readAsDataURL(file);
    }

    function fileOnload(e) {
        var result = e.target.result;
        $('#imgSalida').attr("src", result);
    }

    //$("#dtRegistroModal").datepicker({ language: "es", format: "dd/mm/yyyy" });
    //$("#dtCeseModal").datepicker({ language: "es", format: "dd/mm/yyyy" });


});
