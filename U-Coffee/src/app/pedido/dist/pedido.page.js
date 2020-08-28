"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.PedidoPage = void 0;
var core_1 = require("@angular/core");
var PedidoPage = /** @class */ (function () {
    function PedidoPage(actRouter, http, alertCtrl, router, navCtrl) {
        this.actRouter = actRouter;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.router = router;
        this.navCtrl = navCtrl;
        this.varUser = "";
        this.varCod = "";
        this.varPre = "";
        this.varTotal = "";
        this.arrayCod = [];
        this.arrayPre = [];
        this.newCod = [];
        //datos = [];
        this.suma = 0;
    }
    PedidoPage.prototype.alert = function (header, message) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: header,
                            message: message,
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PedidoPage.prototype.inicio = function () {
        this.arrayCod = this.varCod.split(",");
        console.log(this.arrayCod);
        this.arrayPre = this.varPre.split(",");
        console.log(this.arrayPre);
        this.suma = this.arrayPre.reduce(function (a, b) { return a - (-b); }, 0);
        console.log(this.suma);
    };
    PedidoPage.prototype.borrar = function (elemento) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.index = this.arrayCod.indexOf(elemento);
                this.arrayCod.splice(this.index, 1);
                this.arrayPre.splice(this.index, 1);
                this.suma = this.arrayPre.reduce(function (a, b) { return a - (-b); }, 0);
                this.alert('Alerta', 'Has borrado ' + elemento + ' de tu pedido');
                return [2 /*return*/];
            });
        });
    };
    PedidoPage.prototype.volver = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Alerta',
                            message: '¿Quieres cancelar en pedido?',
                            buttons: [
                                {
                                    text: 'No',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                    }
                                }, {
                                    text: 'Si',
                                    handler: function () {
                                        _this.router.navigate(['/tabs/tab2', _this.varUser]);
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PedidoPage.prototype.envPedido = function () {
        return __awaiter(this, void 0, void 0, function () {
            var desc, datosDB;
            var _this = this;
            return __generator(this, function (_a) {
                if ((this.suma == 0) && (this.newCod.length == 0)) {
                    this.alert('Alerta', 'Has borrado todo tu pedido, vuelve a nuestro menú y antójate de algo!');
                }
                else {
                    this.newCod = this.arrayCod;
                    desc = this.newCod.toString();
                    datosDB = {
                        "ndoc": this.varUser,
                        "desc": desc,
                        "total": this.suma
                    };
                    this.http.post('http://localhost/u-coffee/factura.php', JSON.stringify(datosDB)).subscribe(function (res) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            console.log(res);
                            if (res == 1) {
                                this.alert('¡Éxito!', 'Tu pedido ha sido registrado, espera la notificación y recógelo');
                                this.router.navigate(['/tabs/tab2', this.varUser]);
                            }
                            else {
                                this.alert('Alert', 'Ha ocurrido un error, tu pedido no ha sido registrado. Inténtalo más tarde');
                            }
                            return [2 /*return*/];
                        });
                    }); });
                }
                return [2 /*return*/];
            });
        });
    };
    PedidoPage.prototype.ngOnInit = function () {
        this.varCod = this.actRouter.snapshot.paramMap.get('codigo');
        console.log(this.varCod);
        this.varPre = this.actRouter.snapshot.paramMap.get('precio');
        console.log(this.varPre);
        this.varTotal = this.actRouter.snapshot.paramMap.get('total');
        console.log(this.varTotal);
        this.varUser = this.actRouter.snapshot.paramMap.get("user");
        this.inicio();
    };
    PedidoPage = __decorate([
        core_1.Component({
            selector: 'app-pedido',
            templateUrl: './pedido.page.html',
            styleUrls: ['./pedido.page.scss']
        })
    ], PedidoPage);
    return PedidoPage;
}());
exports.PedidoPage = PedidoPage;
