$(document).ready(function () {

    google.charts.load('current', { 'packages': ['corechart', 'line'] });

    var ComparacionAnual = new Vue({
        el: '#ComparacionAnual',
        data: {
            dComparacionAnual: [],
        },
        methods: {
            ListarComparacionAnual: function () {
                var data = {
                    anio: $('#txtAnio').val(),
                    anioAnterior: parseInt($('#txtAnio').val()) - 1,
                };

                var table = null;
                var clearTable = $('#TbReporteComparacionAnual').DataTable();
                clearTable.clear();
                $('#TbReporteComparacionAnual').empty();
                clearTable.destroy();

                axios.post('/Reportes/ComparacionAnio', data).then(response => {
                    if (response.data.length > 0) {
                        $('.btnImprimirGrafico').removeClass('d-none');
                        var ArrayData = response.data;
                        var argTitulo = $('#txtAnio').val() + ' - ' + String($('#txtAnio').val() - 1);

                        for (var i = 0; i < ArrayData.length; i++) {
                            var Total = 0;
                            Total = parseFloat(ArrayData[i]["Enero"]) +
                                parseFloat(ArrayData[i]["Febrero"]) +
                                parseFloat(ArrayData[i]["Marzo"]) +
                                parseFloat(ArrayData[i]["Abril"]) +
                                parseFloat(ArrayData[i]["Mayo"]) +
                                parseFloat(ArrayData[i]["Junio"]) +
                                parseFloat(ArrayData[i]["Julio"]) +
                                parseFloat(ArrayData[i]["Agosto"]) +
                                parseFloat(ArrayData[i]["Setiembre"]) +
                                parseFloat(ArrayData[i]["Octubre"]) +
                                parseFloat(ArrayData[i]["Noviembre"]) +
                                parseFloat(ArrayData[i]["Diciembre"]);
                            ArrayData[i]["total"] = Total;
                        }
                        if (ArrayData.length == 2) {
                            var ArrayDataeglo = {
                                Proyecto: "Diferencia (+/-)",
                                Enero: parseFloat(ArrayData[0]["Enero"]) - parseFloat(ArrayData[1]["Enero"]),
                                Febrero: parseFloat(ArrayData[0]["Febrero"]) - parseFloat(ArrayData[1]["Febrero"]),
                                Marzo: parseFloat(ArrayData[0]["Marzo"]) - parseFloat(ArrayData[1]["Marzo"]),
                                Abril: parseFloat(ArrayData[0]["Abril"]) - parseFloat(ArrayData[1]["Abril"]),
                                Mayo: parseFloat(ArrayData[0]["Mayo"]) - parseFloat(ArrayData[1]["Mayo"]),
                                Junio: parseFloat(ArrayData[0]["Junio"]) - parseFloat(ArrayData[1]["Junio"]),
                                Julio: parseFloat(ArrayData[0]["Julio"]) - parseFloat(ArrayData[1]["Julio"]),
                                Agosto: parseFloat(ArrayData[0]["Agosto"]) - parseFloat(ArrayData[1]["Agosto"]),
                                Setiembre: parseFloat(ArrayData[0]["Setiembre"]) - parseFloat(ArrayData[1]["Setiembre"]),
                                Octubre: parseFloat(ArrayData[0]["Octubre"]) - parseFloat(ArrayData[1]["Octubre"]),
                                Noviembre: parseFloat(ArrayData[0]["Noviembre"]) - parseFloat(ArrayData[1]["Noviembre"]),
                                Diciembre: parseFloat(ArrayData[0]["Diciembre"]) - parseFloat(ArrayData[1]["Diciembre"]),
                                total: parseFloat(ArrayData[0]["total"]) - parseFloat(ArrayData[1]["total"]),
                            }
                            ArrayData.push(ArrayDataeglo);
                        }


                        var listData = ArrayData;

                        this.dComparacionAnual = listData;

                        var arrayGrafico = ArrayData;
                        var objGrafico = [];
                        var acumuladorImporte = 0;

                        if (arrayGrafico.length > 1) {
                            for (var i = 0; i < 12; i++) {
                                var subOBJ = [];
                                subOBJ.push(this.NombreMes(i + 1));
                                subOBJ.push(parseFloat(arrayGrafico[0][this.NombreMes(i + 1)]));
                                subOBJ.push(parseFloat(arrayGrafico[1][this.NombreMes(i + 1)]));
                                objGrafico.push(subOBJ);
                            }
                        } else {
                            for (var i = 0; i < 12; i++) {
                                var subOBJ = [];
                                subOBJ.push(this.NombreMes(i + 1));
                                subOBJ.push(parseFloat(arrayGrafico[0][this.NombreMes(i + 1)]));
                                subOBJ.push(0);
                                objGrafico.push(subOBJ);
                            }
                        }

                        var data = new google.visualization.DataTable();
                        data.addColumn('string', 'Mes');
                        data.addColumn('number', $('#txtAnio').val());
                        data.addColumn('number', parseInt($('#txtAnio').val()) - 1);
                        data.addRows(objGrafico);
                        var options = {
                            title: 'Comparación Anual ' + argTitulo,
                            colors: ['#a52714', '#097138'],
                            vAxis: { format: 'decimal' },
                        };

                        var chart = new google.visualization.LineChart(document.getElementById('ReporteGrafico'));
                        chart.draw(data, options);

                        if ($.fn.dataTable.isDataTable('#TbReporteComparacionAnual')) {
                            table = $('#TbReporteComparacionAnual').DataTable();
                        }
                        else {
                            var item = 0;
                            table = $('#TbReporteComparacionAnual').DataTable({
                                "searching": false,
                                "processing": true,
                                "paging": false,
                                "ordering": false,
                                "info": listData.length < 7 ? false : true,
                                "data": listData,
                                "columns": [
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
                                        title: 'Comparación Anual ' + argTitulo,
                                        text: '<i class="fa fa-file-excel-o fa-1x"> Excel</i>',
                                        className: 'btn btn-success'
                                    }
                                    , {
                                        extend: 'print',
                                        title: 'Comparación Anual ' + argTitulo,
                                        text: '<i class="fa fa-file-text-o fa-1x"> Imprimir</i>',
                                        className: 'btn btn-secondary'
                                    }
                                ]
                            });
                        }



                    } else {
                        $('.btnImprimirGrafico').addClass('d-none');
                        $('#ReporteGrafico').html('');
                    }


                    var data = '';
                    //this.dComparacionAnual = response.data;
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });

            },
            NombreMes: function (mes) {
                var Mes = '';
                switch (mes) {
                    case 1: Mes = 'Enero'; break;
                    case 2: Mes = 'Febrero'; break;
                    case 3: Mes = 'Marzo'; break;
                    case 4: Mes = 'Abril'; break;
                    case 5: Mes = 'Mayo'; break;
                    case 6: Mes = 'Junio'; break;
                    case 7: Mes = 'Julio'; break;
                    case 8: Mes = 'Agosto'; break;
                    case 9: Mes = 'Setiembre'; break;
                    case 10: Mes = 'Octubre'; break;
                    case 11: Mes = 'Noviembre'; break;
                    case 12: Mes = 'Diciembre'; break;
                }
                return Mes;
            },
            ImprimirGrafico: function () {

                var printContents = document.getElementById('ReporteGrafico').innerHTML;
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
            //this.ListarComparacionAnual();
        },
    });



});



