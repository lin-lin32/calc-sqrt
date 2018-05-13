$(function () {
    var formCalc = $('.form-calc');
    var formClacFielset = formCalc.find('fieldset');
    var formClacRes = $('.js_result');
    var formClacBtn = formCalc.find('.btn-calc');
    var inputA = formCalc.find('#valueA');
    var inputB = formCalc.find('#valueB');
    var inputC = formCalc.find('#valueC');

    function formDisable() {
        formClacFielset.prop('disabled', true);
        console.log('fff')
    }

    function formEnable() {
        formClacFielset.prop('disabled', false);
    }

    function handlerSuccess(data) {
        formEnable();

        if(
            !data &&
            !(typeof data.discr !== 'undefined' || typeof data.x1 !== 'undefined' || typeof data.x2 !== 'undefined')
        ) {
            return;
        }

        var res = '<div class="alert alert-info">';

        if(typeof data.discr !== 'undefined') {
            res += '<p class="form-control-static">Disr: ' + data.discr + '</p>';
        }

        if(typeof data.x1 !== 'undefined') {
            res += '<p class="form-control-static">X1: ' + data.x1 + '</p>';
        }

        if(typeof data.x2 !== 'undefined') {
            res += '<p class="form-control-static">X2: ' + data.x2 + '</p>';
        }

        res += '</div>';

        renderRes(res);
    }

    function handlerError(jqXHR, textStatus, errorThrown) {
        formEnable();

        var res = '<div class="alert alert-danger">'
            + '<p class="form-control-static">Status: ' + jqXHR.status + ', ' + jqXHR.statusText + '</p>'
            + '</div>';

        renderRes(res);
    }

    function resetRes() {
        formClacRes.html('');
    }

    function renderRes(str) {
        formClacRes.html(str);
    }

    function sendAJAX(data) {
        formDisable();
        resetRes();

        $.ajax({
            type: 'POST',
            url: 'calc.php',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: handlerSuccess,
            error: handlerError
        });
    }

    function handlerSubmit(event) {
        event.preventDefault();

        var data = {
            a: +inputA.val(),
            b: +inputB.val(),
            c: +inputC.val()
        };

        sendAJAX(data);

        console.info('submit', data);
    }

    formClacBtn.on('click', handlerSubmit);

    /**
     * Number only start
     *
     **/
    $('.form-control').on('keypress', function (e) {
        e = e || event;
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        var chr = getChar(e);
        if (chr == null) return;
        if (chr < '0' || chr > '9') {
            return false;
        }
    });

    function getChar(event) {
        if (event.which == null) {
            if (event.keyCode < 32) return null;
            return String.fromCharCode(event.keyCode); // IE
        }
        if (event.which != 0 && event.charCode != 0) {
            if (event.which < 32) return null;
            return String.fromCharCode(event.which); // another
        }
        return null; // специальная клавиша
    }

   });

