$(document).ready(function () {

    google.charts.load('current', { 'packages': ['corechart', 'line'] });

    var app = new Vue({
        el: '#app',
        data: {
            dProgramacionFacturacion: [],
        },
        methods: {
            ListarProgramacionFacturacion: function () {
                var data = {
                    anio: $('#txtAnio').val()
                };

                var table = null;
                var clearTable = $('#TbReporte').DataTable();
                clearTable.clear();
                $('#TbReporte').empty();
                clearTable.destroy();

                axios.post('/Reportes/ProgramacionFacturacion', data).then(response => {
                    var listData = response.data;
                    if (listData.length > 0) {
                        $('#FilaTabla').removeClass('d-none');
                        $('#ReporteGrafico').addClass('d-none');
                        $('.btnImprimirGrafico').addClass('d-none');

                        var argTitulo = $('#txtAnio').val();

                        if ($.fn.dataTable.isDataTable('#TbReporte')) {
                            table = $('#TbReporte').DataTable();
                        }
                        else {
                            var item = 0;
                            table = $('#TbReporte').DataTable({
                                "searching": false,
                                "processing": true,
                                "paging": false,
                                "ordering": false,
                                "info": listData.length < 7 ? false : true,
                                "data": listData,
                                "columns": [
                                //{ 'data': 'co_proyecto', 'width': '0%' },
                                {
                                    "render": function (data, type, row, meta) {
                                        return parseInt(meta["row"]) + 1;
                                    }
                                },
                                { 'data': 'Proyecto', 'width': '5%' },
                                { 'data': 'Enero', 'width': '5%', render: $.fn.dataTable.render.number(',', '.', 2, '') },
                                { 'data': 'Febrero', 'width': '5%', render: $.fn.dataTable.render.number(',', '.', 2, '') },
                                { 'data': 'Marzo', 'width': '5%', render: $.fn.dataTable.render.number(',', '.', 2, '') },
                                { 'data': 'Abril', 'width': '5%', render: $.fn.dataTable.render.number(',', '.', 2, '') },
                                { 'data': 'Mayo', 'width': '5%', render: $.fn.dataTable.render.number(',', '.', 2, '') },
                                { 'data': 'Junio', 'width': '5%', render: $.fn.dataTable.render.number(',', '.', 2, '') },
                                { 'data': 'Julio', 'width': '5%', render: $.fn.dataTable.render.number(',', '.', 2, '') },
                                { 'data': 'Agosto', 'width': '5%', render: $.fn.dataTable.render.number(',', '.', 2, '') },
                                { 'data': 'Setiembre', 'width': '5%', render: $.fn.dataTable.render.number(',', '.', 2, '') },
                                { 'data': 'Octubre', 'width': '5%', render: $.fn.dataTable.render.number(',', '.', 2, '') },
                                { 'data': 'Noviembre', 'width': '5%', render: $.fn.dataTable.render.number(',', '.', 2, '') },
                                { 'data': 'Diciembre', 'width': '5%', render: $.fn.dataTable.render.number(',', '.', 2, '') },
                                { 'data': 'total', 'width': '5%', render: $.fn.dataTable.render.number(',', '.', 2, '') },
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
                                },
                                dom: 'Bfrtip',
                                buttons: [
                                    {
                                        extend: 'excel',
                                        title: 'Programación de la Facturación ' + argTitulo,
                                        text: '<i class="fa fa-file-excel-o fa-1x"> Excel</i>',
                                        className: 'btn btn-success'
                                    }
                                    , {
                                        extend: 'print',
                                        title: 'Programación de la Facturación ' + argTitulo,
                                        text: '<i class="fa fa-file-text-o fa-1x"> Imprimir</i>',
                                        className: 'btn btn-secondary'
                                    }
                                ]
                            });
                        }
                    } else {
                        this.clearDatatable();
                    }


                    //this.dProgramacionFacturacion = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarFacturacionMes: function () {
                var data = {
                    anio: $('#txtAnio').val()
                };
                axios.post('/Reportes/FacturacionMes', data).then(response => {


                    if (response.data.length > 0) {
                        $('#FilaTabla').addClass('d-none');
                        $('#ReporteGrafico').removeClass('d-none');
                        $('.btnImprimirGrafico').removeClass('d-none');
                        var arr = response.data;

                        var argTitulo = $('#txtAnio').val();

                        var objFacturacionMes = [];
                        var SimboloMoneda = arr[0]["SimboloMoneda"];
                        for (var i = 0; i < arr.length; i++) {
                            var subObjFacturacionMes = [];
                            subObjFacturacionMes.push(arr[i]["NombreMes"]);
                            subObjFacturacionMes.push(arr[i]["Importe"]);
                            subObjFacturacionMes.push(arr[i]["SimboloMoneda"] + arr[i]["Importe"]);
                            objFacturacionMes.push(subObjFacturacionMes);
                        }

                        var dataTable = new google.visualization.DataTable();
                        dataTable.addColumn('string', 'Mes');
                        dataTable.addColumn('number', SimboloMoneda);

                        dataTable.addColumn({ type: 'string', role: 'tooltip' });
                        dataTable.addRows(objFacturacionMes);

                        var options = {
                            title: 'Facturación por Mes ' + argTitulo,
                            vAxis: { format: 'decimal' },
                            width: 900,
                            height: 500
                        };
                        var chart = new google.visualization.ColumnChart(document.getElementById('ReporteGrafico'));
                        chart.draw(dataTable, options);

                    } else {
                        $('#ReporteGrafico').addClass('d-none');
                        $('.btnImprimirGrafico').addClass('d-none');
                    }

                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarCrecimientoProgramacionFacturacion: function () {

                var data = {
                    anio: $('#txtAnio').val()
                };
                axios.post('/Reportes/FacturacionMes', data).then(response => {

                    if (response.data.length > 0) {
                        $('#FilaTabla').addClass('d-none');
                        $('#ReporteGrafico').removeClass('d-none');
                        $('.btnImprimirGrafico').removeClass('d-none');

                        var argTitulo = $('#txtAnio').val();
                        var arr = response.data;
                        var obj = [];
                        var acumuladorImporte = 0;
                        for (var i = 0; i < arr.length; i++) {
                            var subOBJ = [];
                            subOBJ.push(arr[i]["NombreMes"]);
                            subOBJ.push(arr[i]["Importe"]);
                            acumuladorImporte += arr[i]["Importe"];
                            subOBJ.push(acumuladorImporte);
                            obj.push(subOBJ);
                        }

                        var data = new google.visualization.DataTable();
                        data.addColumn('string', 'Mes');
                        data.addColumn('number', 'Facturación X Mes');
                        data.addColumn('number', 'Crecimiento de Venta ' + $('#txtAnio').val());

                        data.addRows(obj);

                        var options = {
                            title: 'Crecimiento Facturación por Mes ' + argTitulo,
                            colors: ['#a52714', '#097138'],
                            vAxis: { format: 'decimal' },
                            axes: {
                                x: {
                                    0: { side: 'top' }
                                }
                            }
                        };

                        var chart = new google.visualization.LineChart(document.getElementById('ReporteGrafico'));
                        chart.draw(data, options);

                    } else {
                        $('#ReporteGrafico').addClass('d-none');
                        $('.btnImprimirGrafico').addClass('d-none');
                    }

                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ImprimirGrafico: function () {

                var printContents = document.getElementById('ReporteGraficos').innerHTML;
                w = window.open();
                w.document.write(printContents);
                w.document.close(); // necessary for IE >= 10
                w.focus(); // necessary for IE >= 10
                w.print();
                w.close();
                return true;
            },
        },
        created: function () {
            //this.ListarProgramacionFacturacion();
        },
    });

    var FacturacionMes = new Vue({
        el: '#FacturacionMes',
        data: {
            dFacturacionMes: [],
        },
        methods: {
            ListarFacturacionMes: function () {

                var data = {
                    anio: $('#txtAnio').val()
                };
                axios.post('/Reportes/FacturacionMes', data).then(response => {


                    if (response.data.length > 0) {
                        $('#ReporteGrafico').removeClass('d-none');
                        var arr = response.data;
                        var objFacturacionMes = [];
                        var SimboloMoneda = arr[0]["SimboloMoneda"];
                        for (var i = 0; i < arr.length; i++) {
                            var subObjFacturacionMes = [];
                            subObjFacturacionMes.push(arr[i]["NombreMes"]);
                            subObjFacturacionMes.push(arr[i]["Importe"]);
                            subObjFacturacionMes.push(arr[i]["SimboloMoneda"] + arr[i]["Importe"]);
                            objFacturacionMes.push(subObjFacturacionMes);
                        }

                        var dataTable = new google.visualization.DataTable();
                        dataTable.addColumn('string', 'Mes');
                        dataTable.addColumn('number', SimboloMoneda);

                        dataTable.addColumn({ type: 'string', role: 'tooltip' });
                        dataTable.addRows(objFacturacionMes);

                        var options = {
                            chart: {
                                title: '',
                                subtitle: '',
                            },
                            vAxis: { format: 'decimal' },
                            width: 900,
                            height: 500
                        };
                        var chart = new google.visualization.ColumnChart(document.getElementById('ReporteGrafico'));
                        chart.draw(dataTable, options);

                    } else {
                        $('#ReporteGrafico').addClass('d-none');
                    }

                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
        },
        created: function () {
            //this.ListarFacturacionMes();
        },
    });

    var CrecimientoFacturacionMes = new Vue({
        el: '#CrecimientoFacturacionMes',
        data: {
            dProgramacionFacturacion: [],
        },
        methods: {
            ListarCrecimientoProgramacionFacturacion: function () {

                var data = {
                    anio: $('#txtAnio').val()
                };
                axios.post('/Reportes/FacturacionMes', data).then(response => {


                    if (response.data.length > 0) {
                        $('#ReporteGrafico').removeClass('d-none');
                        var arr = response.data;
                        var obj = [];
                        var acumuladorImporte = 0;
                        for (var i = 0; i < arr.length; i++) {
                            var subOBJ = [];
                            subOBJ.push(arr[i]["NombreMes"]);
                            subOBJ.push(arr[i]["Importe"]);
                            acumuladorImporte += arr[i]["Importe"];
                            subOBJ.push(acumuladorImporte);
                            obj.push(subOBJ);
                        }

                        var data = new google.visualization.DataTable();
                        data.addColumn('string', 'Mes');
                        data.addColumn('number', 'Facturación X Mes');
                        data.addColumn('number', 'Crecimiento de Venta ' + $('#txtAnio').val());

                        data.addRows(obj);

                        var options = {
                            colors: ['#a52714', '#097138'],
                            vAxis: { format: 'decimal' },
                        };

                        var chart = new google.visualization.LineChart(document.getElementById('ReporteGrafico'));
                        chart.draw(data, options);

                    } else {
                        $('#ReporteGrafico').addClass('d-none');
                    }

                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },

        },
        created: function () {
            //this.ListarCrecimientoProgramacionFacturacion();
        },
    });

    var ConsultaEjecucionPago = new Vue({
        el: '#ConsultaEjecucionPago',
        data: {
            dProgramacionFacturacion: [],
        },
        methods: {
            ListarCronogramaEjecucionPago: function () {
                var data = {
                    so_interna: $('#txtSolicitudInterna').val(),
                    nu_ordencompra: $('#txtOrdenCompra').val(),
                    nu_recepcion: $('#txtNroRecepcion').val(),
                    nu_facturacion: $('#txtFactura').val(),
                };

                var table = null;
                var clearTable = $('#TbReporteEjecucionPago').DataTable();
                clearTable.clear();
                $('#TbReporteEjecucionPago').empty();
                clearTable.destroy();

                axios.post('/Reportes/ConsultaEjecucionPago', data).then(response => {
                    var listData = response.data;
                    if (listData.length > 0) {
                        
                        if ($.fn.dataTable.isDataTable('#TbReporteEjecucionPago')) {
                            table = $('#TbReporteEjecucionPago').DataTable();
                        }
                        else {
                            var item = 0;
                            table = $('#TbReporteEjecucionPago').DataTable({
                                "searching": false,
                                "processing": true,
                                "paging": false,
                                "ordering": false,
                                "info": listData.length < 7 ? false : true,
                                "data": listData,
                                "columns": [
                                { 'data': 'de_proyecto', 'width': '5%' },
                                { 'data': 'co_SRT', 'width': '5%' },
                                { 'data': 'so_interna', 'width': '5%' },
                                { 'data': 'nu_ordencompra', 'width': '5%' },
                                { 'data': 'nu_recepcion', 'width': '5%' },
                                { 'data': 'nu_facturacion', 'width': '5%' },
                                { 'data': 'mo_importefacturacion', 'width': '5%', render: $.fn.dataTable.render.number(',', '.', 2, '') },
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
                                },
                                dom: 'Bfrtip',
                                buttons: [
                                    {
                                        extend: 'excel',
                                        title: "Reporte Ejecución de Pago ",
                                        text: '<i class="fa fa-file-excel-o fa-1x"> Excel</i>',
                                        className: 'btn btn-success'
                                    }
                                    , {

                                        extend: 'print',
                                        title: "Reporte Ejecución de Pago " ,
                                        text: '<i class="fa fa-file-text-o fa-1x"> Imprimir</i>',
                                        className: 'btn btn-secondary'
                                    }
                                ]
                            });
                        }
                    } else {
                        this.clearDatatable();
                    }


                    //this.dProgramacionFacturacion = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
        },
        created: function () {
            //this.ListarCronogramaEjecucionPago();
        },
    });

    var ConsultaProgramacionPago = new Vue({
        el: '#ConsultaProgramacionPago',
        data: {
            dEstadoCronograma: [],
            dProgramacionPago: [],
            dResponsable: [],
        },
        methods: {
            ListarProgramacionPago: function () {
                var data = {
                    st_cronograma: $('#cboEstadoCronograma').val(),
                    fe_pago: $('#txtFechaInicioBusqueda').val(),
                    co_responsable: $('#cboResponsable').val(),
                };

                var table = null;
                var clearTable = $('#TbReporteProgramacionPago').DataTable();
                clearTable.clear();
                $('#TbReporteProgramacionPago').empty();
                clearTable.destroy();

                axios.post('/Reportes/ConsultaProgramacionPago', data).then(response => {
                    var listData = response.data;
                    if (listData.length > 0) {

                        if ($.fn.dataTable.isDataTable('#TbReporteProgramacionPago')) {
                            table = $('#TbReporteProgramacionPago').DataTable();
                        }
                        else {
                            var item = 0;
                            table = $('#TbReporteProgramacionPago').DataTable({
                                "searching": false,
                                "processing": true,
                                "paging": false,
                                "ordering": false,
                                "info": listData.length < 7 ? false : true,
                                "data": listData,
                                "columns": [
                                { 'data': 'de_proyecto', 'width': '35%' },
                                { 'data': 'co_SRT', 'width': '15%' },
                                { 'data': 'fe_pago', 'width': '5%' },
                                { 'data': 'fe_programada', 'width': '5%' },
                                { 'data': 'nu_hito', 'width': '5%' },
                                { 'data': 'de_hito', 'width': '15%' },
                                {
                                    'data': 'SimboloMoneda', 'width': '10%',
                                   "render": function (data, type, row, meta) {
                                       return '<h6> ' + row["SimboloMoneda"] + ' ' + ConvertirMiles(row["mo_importe"]) + ' </h6>';
                                   }
                                },
                                { 'data': 'Responsable', 'width': '15%' },                                
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
                                },
                                dom: 'Bfrtip',
                                buttons: [
                                    {
                                        extend: 'excel',
                                        title: "Reporte Programación de Pago ",
                                        text: '<i class="fa fa-file-excel-o fa-1x"> Excel</i>',
                                        className: 'btn btn-success'
                                    }
                                    , {

                                        extend: 'print',
                                        title: "Reporte Programación de Pago ",
                                        text: '<i class="fa fa-file-text-o fa-1x"> Imprimir</i>',
                                        className: 'btn btn-secondary'
                                    }
                                ]
                            });
                        }
                    } else {
                        this.clearDatatable();
                    }


                    //this.dProgramacionFacturacion = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarEstadosCronograma: function () {
                var data = {
                    co_tabla: 10,
                };
                axios.post('/TGeneral/CargaTGeneral', data).then(response => {
                    this.dEstadoCronograma = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarResponsable: function () {
                var data = {
                    st_responsable: 1,
                };
                axios.post('/Responsable/CargaGrilla', data).then(response => {
                    this.dResponsable = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
        },
        created: function () {
            this.ListarEstadosCronograma();
            this.ListarResponsable();
        },
    });

    var ConvertirMiles = function (n) {
        n = n.toString()
        while (true) {
            var n2 = n.replace(/(\d)(\d{3})($|,|\.)/g, '$1,$2$3')
            if (n == n2) break
            n = n2
        }
        return n
    }

    $('#txtFechaInicioBusqueda').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: "es"
    }).on('hide', function (selected) {
        //app.Listartabla();
    });

});





