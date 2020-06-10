$(document).ready(function () {

    var appProyectoRecurso = new Vue({
        el: '#appProyectoRecurso',
        data: {
            dRoles: [],
            dProyectoRecurso: [],
            IdProyecto: 0,
            NroResponsables: 0,
        },
        methods: {
            AbrirModal: function () {
                $('#ModalProyectoRecurso').modal('show');
            },
            ListarRoles: function () {
                var data = {
                    co_tabla: 13,
                };
                axios.post('/TGeneral/CargaTGeneral', data).then(response => {
                    this.dRoles = response.data;
                    //this.ListarProyecto();
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            ListarProyecto: function () {

                var Datos = {};
                Datos.co_proyecto = this.IdProyecto;

                var _Roles = this.dRoles;
                var table = null;
                var _NroRecursos = 0;
                axios.post('/ProyectoRecurso/CargaGrilla', Datos).then(response => {
                    this.dProyectoRecurso = response.data;
                    
                    response.data.sort(function (a, b) {
                        var a1 = a.de_recurso, b1 = b.de_recurso;
                        if (a1 == b1) return 0;
                        return a1 > b1 ? 1 : -1;
                    });
                    response.data.sort(function (a, b) {
                        var a1 = a.st_estado, b1 = b.st_estado;
                        if (a1 == b1) return 0;
                        return b1 > a1 ? 1 : -1;
                    });

                    var html = '<div id="DivBody" class="container-fluid pre-scrollable"><table id="tbProyectoRecurso" class="table table-hover"><tbody id="BodyGrillas" class="tbody">';
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
                    html += '</tbody></table></div>';
                    $('#contenedorTabla').html('');
                    $('#contenedorTabla').html(html);

                    $('#txtNroRecursos').text(_NroRecursos);
                    $('.ValidarNumeros').inputmask('decimal', { rightAlign: false });
                    

                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });
            },
            GuardarRecurso: function () {
                var check = $('#tbProyectoRecurso tbody input:checkbox');

                var Object = [];
                var strUrl = '';
                var _IdProyecto = this.IdProyecto;
                var Validador = 0;

                $('.ErrorProyectoRecurso').removeClass('ErrorProyectoRecurso');
                $.each($('#tbProyectoRecurso tbody input:checkbox'), function (k, v) {
                    var DTO = {};                    
                    if ($(v).prop("checked")) {
                        var input = $('#tbProyectoRecurso tbody input:text')[k];
                        var select = $('#tbProyectoRecurso tbody select')[k];
                        var hdcrp = $('#tbProyectoRecurso tbody input:hidden.cpr')[k];
                        var hdcr = $('#tbProyectoRecurso tbody input:hidden.cr')[k];
                        var h6dr = $('#tbProyectoRecurso tbody h6.dr')[k];

                        if ($(input).val() == "0" || $(input).val() == "") {
                            $(input).addClass('ErrorProyectoRecurso');
                            Validador++;
                        }
                        if ($(select).val() == 0) {
                            $(select).addClass('ErrorProyectoRecurso');
                            Validador++;
                        }
                        DTO.co_proyecto = _IdProyecto;
                        DTO.co_proyecto_recurso = $(hdcrp).val();
                        DTO.co_recurso = $(hdcr).val();
                        DTO.st_estado = ($(v).prop("checked") ? 1 : 0);
                        DTO.nu_porcentaje = $(input).val() == '' ? 0 : $(input).val();
                        DTO.co_rol = $(select).val();
                        Object.push(DTO);
                    }
                });
                if (Validador != 0) {
                    MensajeModal("Debe completar los campos seleccionados.", 2);
                    return;
                }
                if (Object.length == 0) {
                    Object.push({co_proyecto : _IdProyecto});
                }

                var strMsj = "Se asigno correctamente a los Responsables.";
                axios.post('/ProyectoRecurso/Ins_ProyectoRecurso', Object).then(response => {
                    var urltr = response.data;
                    //this.ListarProyecto();
                    if (response.data == 0) {
                        $('#SPRecursos' + this.IdProyecto).text($('#txtNroRecursos').text());
                        this.IdProyecto = '';
                        MensajeModal(strMsj, 0);
                        //this.Listartabla();
                    } else {
                        MensajeModal(response.data, 2)
                    }
                }).catch(error => {
                    console.log(error);
                    this.errored = true;
                });

                var datios = "";
            },
        },
        created: function () {

            this.ListarRoles();
        },
    });

    GenerarProyectoRecurso = function (IdProyecto) {

        appProyectoRecurso.IdProyecto = IdProyecto;
        appProyectoRecurso.ListarProyecto();
    }

    $('#tbProyectoRecurso tbody').on('change', 'input:checkbox', function (key, Value) {
        var input = $('#tbProyectoRecurso tbody input:text')[$(this).parents('tr').prop("sectionRowIndex")];
        var select = $('#tbProyectoRecurso tbody select')[$(this).parents('tr').prop("sectionRowIndex")];
        if ($(this).prop("checked")) {
            
            $(input).attr('disabled', false);
            $(select).attr('disabled', false);
        } else {
            $(input).val('0');
            $(select).val(0);
            $(input).attr('disabled', true);
            $(select).attr('disabled', true);
            $('.ErrorProyectoRecurso').removeClass('ErrorProyectoRecurso');
        }
        var _NroRecursos = 0;
        $.each($('#tbProyectoRecurso tbody input:checkbox'), function (k, v) {

            if ($(v).prop("checked")) {
                _NroRecursos++;
            }
            $('#txtNroRecursos').text(_NroRecursos);
        });

    });

    $('#tbProyectoRecurso tbody').on('blur', 'input:text', function () {
        if ($(this).val()>0) {
            $(this).removeClass('ErrorProyectoRecurso');
        } else {
            $(this).addClass('ErrorProyectoRecurso');
        }
    });

    $('#tbProyectoRecurso tbody').on('change', 'select', function () {
        if ($(this).val() > 0) {
            $(this).removeClass('ErrorProyectoRecurso');
        } else {
            $(this).addClass('ErrorProyectoRecurso');
        }
    });




});



