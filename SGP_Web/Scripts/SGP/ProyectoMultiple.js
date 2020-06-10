$(document).ready(function () {

    var appProyectoMultiple = new Vue({
        el: '#appProyectoMultiple',
        data: {
            dProyecto: [],
            IdProyecto: '',
        },
        methods: {
            AbrirModal: function () {
                $('#ModalBusqueda').modal('show');
            },
            ListarProyecto: function () {

                var Datos = {};
                Datos.de_proyecto = $('#txtProyectoBusqueda').val();
                
                axios.post('/Proyecto/CargaGrilla', Datos).then(response => {
                    var listData = response.data;



                    var html = '';
                    $.each(response.data, function (k, v) {
                        html += '<tr>';

                        html += '<td  width="5%">';
                        var htmlChecked = '';
                        if (v["st_estado"] == 1) {
                            htmlChecked = "checked";
                            _NroRecursos++;
                        }

                        html += '<input type="checkbox" class="col-xs-4 offset-4" value="" ' + htmlChecked + ' >';
                        html += '</td>';

                        html += '<td  class="d-none">';
                        html += '<input type="hidden" class="cpr" value="' + v["co_proyecto_recurso"] + '">';
                        html += '</td>';

                        html += '<td width="40%">';
                        html += '<h6 class="dr">' + v["de_recurso"] + '</h6>';
                        html += '</td>';

                        html += '<td  class="d-none">';
                        html += '<input type="hidden" class="cr" value="' + v["co_recurso"] + '">';
                        html += '</td>';

                        html += '<td width="25%">';
                        html += '<h6>' + v["de_rol"] + '</h6>';
                        html += '</td>';

                        html += '<td  class="d-none">';
                        html += '<input type="hidden" class="est" value="' + v["st_estado"] + '">';
                        html += '</td>';

                        html += '<td  class="d-none">';
                        html += '<input type="hidden" class="crl" value="' + v["co_rol"] + '">';
                        html += '</td>';

                        html += '<td width="10%">';
                        var htmlDisabled = v["st_estado"] == 0 ? 'disabled="true"' : '';
                        html += '<input id="txtPorcentaje"  type="text" class="form-control ValidarNumeros" maxlength="3" value="' + v['nu_porcentaje'] + '" ' + htmlDisabled + '/>';
                        html += '</td>';

                        html += '<td width="20%">';
                        var htmlDisabled = v["st_estado"] == 0 ? 'disabled="true"' : '';
                        html += '<select  class="form-control  " ' + htmlDisabled + '>';
                        html += '<option value="0">Seleccione</option>';
                        var Rol = v["co_rol"];

                        $.each(_Roles, function (k, e) {
                            var htmlSelect = "";
                            if (Rol == e["co_codigo"]) {
                                htmlSelect = "selected"
                            }
                            html += '<option value="' + e["co_codigo"] + '" ' + htmlSelect + '>' + e["de_tabla"] + '</option>';
                        });
                        html += '</select>';
                        html += '</td>';

                        html += '</tr>';
                    });

                    $('#BodyGrillas').html('');
                    $('#BodyGrillas').html(html);



                    if (listData !== "[]") {
                        if ($.fn.dataTable.isDataTable('#tbProyecto')) {
                            table = $('#tbProyecto').DataTable();
                        }
                        else {
                            var item = 0;
                            table = $('#tbProyecto').DataTable({
                                "searching": false,
                                "processing": true,
                                "paging": true,
                                "ordering": false,
                                "info": listData.length < 7 ? false : true,
                                "data": listData,
                                "columns": [
                                { 'data': 'co_proyecto', 'className': 'd-none', 'width': '0%' },
                                { 'data': 'de_proyecto', 'width': '30%' },
                                { 'data': 'co_SRT', 'width': '10%' },
                                { 'data': 'mo_total', 'width': '5%', render: $.fn.dataTable.render.number(',', '.', 2, '') },
                                { 'data': 'tx_valor3', 'width': '10%' },
                                { 'data': 'tx_valor1', 'width': '25%' },
                                { 'data': 'sm_moneda', 'className': 'd-none', 'width': '0%' },
                                { 'data': 'co_moneda', 'className': 'd-none', 'width': '0%' },
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
                            $('#tbProyecto tbody').on('click', 'tr', function () {
                                var table = $('#tbProyecto').DataTable();
                                var data = table.row(this).data();
                                $('#ModalBusqueda').modal('hide');
                                EjecutarListar(data);
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
        },
        created: function () {
            this.ListarProyecto();
        },
    });


    //$("#tbProyecto").on("click", "button.Seleccionar", function () {
    //    var table = $('#tbProyecto').DataTable();
    //    if (table.row(this).child.isShown()) {
    //        var data = table.row(this).data();
    //    } else {
    //        var data = table.row($(this).parents("tr")).data();
    //    }
    //    $('#ModalBusqueda').modal('hide');
    //    EjecutarListar(data);
    //});

    //$("#tbProyecto tbody").on("click", "tr",function () {
    //    var table = $('#tbProyecto').DataTable();
    //    if (table.row(this).child.isShown()) {
    //        var data = table.row(this).data();
    //    } else {
    //        var data = table.row($(this).parents("tr")).data();
    //    }
    //    $('#ModalBusqueda').modal('hide');
    //    EjecutarListar(data);
    //});


});



