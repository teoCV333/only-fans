import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { CustomSelectComponent } from "../custom-select/custom-select.component";
import { SuscriptionService } from '../../services/suscription.service';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { TransactionResponseComponent } from "../transaction-response/transaction-response.component";


@Component({
  standalone: true,
  selector: 'app-payment-form',
  imports: [ReactiveFormsModule, FormsModule, CustomSelectComponent, CommonModule, NgxMaskDirective, TransactionResponseComponent],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent {
  modalService = inject(ModalService);
  suscriptionService = inject(SuscriptionService);

  paymentLoading = signal<boolean>(false);
  paymentResult = signal<boolean>(false);
  errorSubmited = signal<boolean>(false);
  
  isFocused = false;
  userInput = '';

  cardMask: string = '0000 0000 0000 0000'; 
  cvcMask: string = '000'

  cardIcons = [
    '/assets/visaIcon.png',
    '/assets/mastercardIcon.png',
    '/assets/maestroIcon.png',
    '/assets/dinnersIcon.png',
    '/assets/discoverIcon.png',
    '/assets/jcbIcon.png',
  ]

  countries = [
    {
      name: "CO",
      flag: "/assets/svg/co.svg"
    },
    {
      name: "AD",
      flag: "/assets/svg/ad.svg"
    },
    {
      name: "AE",
      flag: "/assets/svg/ae.svg"
    },
    {
      name: "AF",
      flag: "/assets/svg/af.svg"
    },
    {
      name: "AG",
      flag: "/assets/svg/ag.svg"
    },
    {
      name: "AI",
      flag: "/assets/svg/ai.svg"
    },
    {
      name: "AL",
      flag: "/assets/svg/al.svg"
    },
    {
      name: "AM",
      flag: "/assets/svg/am.svg"
    },
    {
      name: "AO",
      flag: "/assets/svg/ao.svg"
    },
    {
      name: "AQ",
      flag: "/assets/svg/aq.svg"
    },
    {
      name: "AR",
      flag: "/assets/svg/ar.svg"
    },
    {
      name: "AS",
      flag: "/assets/svg/as.svg"
    },
    {
      name: "AT",
      flag: "/assets/svg/at.svg"
    },
    {
      name: "AU",
      flag: "/assets/svg/au.svg"
    },
    {
      name: "AW",
      flag: "/assets/svg/aw.svg"
    },
    {
      name: "AX",
      flag: "/assets/svg/ax.svg"
    },
    {
      name: "AZ",
      flag: "/assets/svg/az.svg"
    },
    {
      name: "BA",
      flag: "/assets/svg/ba.svg"
    },
    {
      name: "BB",
      flag: "/assets/svg/bb.svg"
    },
    {
      name: "BD",
      flag: "/assets/svg/bd.svg"
    },
    {
      name: "BE",
      flag: "/assets/svg/be.svg"
    },
    {
      name: "BF",
      flag: "/assets/svg/bf.svg"
    },
    {
      name: "BG",
      flag: "/assets/svg/bg.svg"
    },
    {
      name: "BH",
      flag: "/assets/svg/bh.svg"
    },
    {
      name: "BI",
      flag: "/assets/svg/bi.svg"
    },
    {
      name: "BJ",
      flag: "/assets/svg/bj.svg"
    },
    {
      name: "BL",
      flag: "/assets/svg/bl.svg"
    },
    {
      name: "BM",
      flag: "/assets/svg/bm.svg"
    },
    {
      name: "BN",
      flag: "/assets/svg/bn.svg"
    },
    {
      name: "BO",
      flag: "/assets/svg/bo.svg"
    },
    {
      name: "BQ",
      flag: "/assets/svg/bq.svg"
    },
    {
      name: "BR",
      flag: "/assets/svg/br.svg"
    },
    {
      name: "BS",
      flag: "/assets/svg/bs.svg"
    },
    {
      name: "BT",
      flag: "/assets/svg/bt.svg"
    },
    {
      name: "BV",
      flag: "/assets/svg/bv.svg"
    },
    {
      name: "BW",
      flag: "/assets/svg/bw.svg"
    },
    {
      name: "BY",
      flag: "/assets/svg/by.svg"
    },
    {
      name: "BZ",
      flag: "/assets/svg/bz.svg"
    },
    {
      name: "CA",
      flag: "/assets/svg/ca.svg"
    },
    {
      name: "CC",
      flag: "/assets/svg/cc.svg"
    },
    {
      name: "CD",
      flag: "/assets/svg/cd.svg"
    },
    {
      name: "CF",
      flag: "/assets/svg/cf.svg"
    },
    {
      name: "CG",
      flag: "/assets/svg/cg.svg"
    },
    {
      name: "CH",
      flag: "/assets/svg/ch.svg"
    },
    {
      name: "CI",
      flag: "/assets/svg/ci.svg"
    },
    {
      name: "CK",
      flag: "/assets/svg/ck.svg"
    },
    {
      name: "CL",
      flag: "/assets/svg/cl.svg"
    },
    {
      name: "CM",
      flag: "/assets/svg/cm.svg"
    },
    {
      name: "CN",
      flag: "/assets/svg/cn.svg"
    },
    {
      name: "CR",
      flag: "/assets/svg/cr.svg"
    },
    {
      name: "CU",
      flag: "/assets/svg/cu.svg"
    },
    {
      name: "CV",
      flag: "/assets/svg/cv.svg"
    },
    {
      name: "CW",
      flag: "/assets/svg/cw.svg"
    },
    {
      name: "CX",
      flag: "/assets/svg/cx.svg"
    },
    {
      name: "CY",
      flag: "/assets/svg/cy.svg"
    },
    {
      name: "CZ",
      flag: "/assets/svg/cz.svg"
    },
    {
      name: "DE",
      flag: "/assets/svg/de.svg"
    },
    {
      name: "DJ",
      flag: "/assets/svg/dj.svg"
    },
    {
      name: "DK",
      flag: "/assets/svg/dk.svg"
    },
    {
      name: "DM",
      flag: "/assets/svg/dm.svg"
    },
    {
      name: "DO",
      flag: "/assets/svg/do.svg"
    },
    {
      name: "DZ",
      flag: "/assets/svg/dz.svg"
    },
    {
      name: "EC",
      flag: "/assets/svg/ec.svg"
    },
    {
      name: "EE",
      flag: "/assets/svg/ee.svg"
    },
    {
      name: "EG",
      flag: "/assets/svg/eg.svg"
    },
    {
      name: "EH",
      flag: "/assets/svg/eh.svg"
    },
    {
      name: "ER",
      flag: "/assets/svg/er.svg"
    },
    {
      name: "ES",
      flag: "/assets/svg/es.svg"
    },
    {
      name: "ET",
      flag: "/assets/svg/et.svg"
    },
    {
      name: "FI",
      flag: "/assets/svg/fi.svg"
    },
    {
      name: "FJ",
      flag: "/assets/svg/fj.svg"
    },
    {
      name: "FK",
      flag: "/assets/svg/fk.svg"
    },
    {
      name: "FM",
      flag: "/assets/svg/fm.svg"
    },
    {
      name: "FO",
      flag: "/assets/svg/fo.svg"
    },
    {
      name: "FR",
      flag: "/assets/svg/fr.svg"
    },
    {
      name: "GA",
      flag: "/assets/svg/ga.svg"
    },
    {
      name: "GB-ENG",
      flag: "/assets/svg/gb-eng.svg"
    },
    {
      name: "GB-NIR",
      flag: "/assets/svg/gb-nir.svg"
    },
    {
      name: "GB-SCT",
      flag: "/assets/svg/gb-sct.svg"
    },
    {
      name: "GB-WLS",
      flag: "/assets/svg/gb-wls.svg"
    },
    {
      name: "GB",
      flag: "/assets/svg/gb.svg"
    },
    {
      name: "GD",
      flag: "/assets/svg/gd.svg"
    },
    {
      name: "GE",
      flag: "/assets/svg/ge.svg"
    },
    {
      name: "GF",
      flag: "/assets/svg/gf.svg"
    },
    {
      name: "GG",
      flag: "/assets/svg/gg.svg"
    },
    {
      name: "GH",
      flag: "/assets/svg/gh.svg"
    },
    {
      name: "GI",
      flag: "/assets/svg/gi.svg"
    },
    {
      name: "GL",
      flag: "/assets/svg/gl.svg"
    },
    {
      name: "GM",
      flag: "/assets/svg/gm.svg"
    },
    {
      name: "GN",
      flag: "/assets/svg/gn.svg"
    },
    {
      name: "GP",
      flag: "/assets/svg/gp.svg"
    },
    {
      name: "GQ",
      flag: "/assets/svg/gq.svg"
    },
    {
      name: "GR",
      flag: "/assets/svg/gr.svg"
    },
    {
      name: "GS",
      flag: "/assets/svg/gs.svg"
    },
    {
      name: "GT",
      flag: "/assets/svg/gt.svg"
    },
    {
      name: "GU",
      flag: "/assets/svg/gu.svg"
    },
    {
      name: "GW",
      flag: "/assets/svg/gw.svg"
    },
    {
      name: "GY",
      flag: "/assets/svg/gy.svg"
    },
    {
      name: "HK",
      flag: "/assets/svg/hk.svg"
    },
    {
      name: "HM",
      flag: "/assets/svg/hm.svg"
    },
    {
      name: "HN",
      flag: "/assets/svg/hn.svg"
    },
    {
      name: "HR",
      flag: "/assets/svg/hr.svg"
    },
    {
      name: "HT",
      flag: "/assets/svg/ht.svg"
    },
    {
      name: "HU",
      flag: "/assets/svg/hu.svg"
    },
    {
      name: "ID",
      flag: "/assets/svg/id.svg"
    },
    {
      name: "IE",
      flag: "/assets/svg/ie.svg"
    },
    {
      name: "IL",
      flag: "/assets/svg/il.svg"
    },
    {
      name: "IM",
      flag: "/assets/svg/im.svg"
    },
    {
      name: "IN",
      flag: "/assets/svg/in.svg"
    },
    {
      name: "IO",
      flag: "/assets/svg/io.svg"
    },
    {
      name: "IQ",
      flag: "/assets/svg/iq.svg"
    },
    {
      name: "IR",
      flag: "/assets/svg/ir.svg"
    },
    {
      name: "IS",
      flag: "/assets/svg/is.svg"
    },
    {
      name: "IT",
      flag: "/assets/svg/it.svg"
    },
    {
      name: "JE",
      flag: "/assets/svg/je.svg"
    },
    {
      name: "JM",
      flag: "/assets/svg/jm.svg"
    },
    {
      name: "JO",
      flag: "/assets/svg/jo.svg"
    },
    {
      name: "JP",
      flag: "/assets/svg/jp.svg"
    },
    {
      name: "KE",
      flag: "/assets/svg/ke.svg"
    },
    {
      name: "KG",
      flag: "/assets/svg/kg.svg"
    },
    {
      name: "KH",
      flag: "/assets/svg/kh.svg"
    },
    {
      name: "KI",
      flag: "/assets/svg/ki.svg"
    },
    {
      name: "KM",
      flag: "/assets/svg/km.svg"
    },
    {
      name: "KN",
      flag: "/assets/svg/kn.svg"
    },
    {
      name: "KP",
      flag: "/assets/svg/kp.svg"
    },
    {
      name: "KR",
      flag: "/assets/svg/kr.svg"
    },
    {
      name: "KW",
      flag: "/assets/svg/kw.svg"
    },
    {
      name: "KY",
      flag: "/assets/svg/ky.svg"
    },
    {
      name: "KZ",
      flag: "/assets/svg/kz.svg"
    },
    {
      name: "LA",
      flag: "/assets/svg/la.svg"
    },
    {
      name: "LB",
      flag: "/assets/svg/lb.svg"
    },
    {
      name: "LC",
      flag: "/assets/svg/lc.svg"
    },
    {
      name: "LI",
      flag: "/assets/svg/li.svg"
    },
    {
      name: "LK",
      flag: "/assets/svg/lk.svg"
    },
    {
      name: "LR",
      flag: "/assets/svg/lr.svg"
    },
    {
      name: "LS",
      flag: "/assets/svg/ls.svg"
    },
    {
      name: "LT",
      flag: "/assets/svg/lt.svg"
    },
    {
      name: "LU",
      flag: "/assets/svg/lu.svg"
    },
    {
      name: "LV",
      flag: "/assets/svg/lv.svg"
    },
    {
      name: "LY",
      flag: "/assets/svg/ly.svg"
    },
    {
      name: "MA",
      flag: "/assets/svg/ma.svg"
    },
    {
      name: "MC",
      flag: "/assets/svg/mc.svg"
    },
    {
      name: "MD",
      flag: "/assets/svg/md.svg"
    },
    {
      name: "ME",
      flag: "/assets/svg/me.svg"
    },
    {
      name: "MF",
      flag: "/assets/svg/mf.svg"
    },
    {
      name: "MG",
      flag: "/assets/svg/mg.svg"
    },
    {
      name: "MH",
      flag: "/assets/svg/mh.svg"
    },
    {
      name: "MK",
      flag: "/assets/svg/mk.svg"
    },
    {
      name: "ML",
      flag: "/assets/svg/ml.svg"
    },
    {
      name: "MM",
      flag: "/assets/svg/mm.svg"
    },
    {
      name: "MN",
      flag: "/assets/svg/mn.svg"
    },
    {
      name: "MO",
      flag: "/assets/svg/mo.svg"
    },
    {
      name: "MP",
      flag: "/assets/svg/mp.svg"
    },
    {
      name: "MQ",
      flag: "/assets/svg/mq.svg"
    },
    {
      name: "MR",
      flag: "/assets/svg/mr.svg"
    },
    {
      name: "MS",
      flag: "/assets/svg/ms.svg"
    },
    {
      name: "MT",
      flag: "/assets/svg/mt.svg"
    },
    {
      name: "MU",
      flag: "/assets/svg/mu.svg"
    },
    {
      name: "MV",
      flag: "/assets/svg/mv.svg"
    },
    {
      name: "MW",
      flag: "/assets/svg/mw.svg"
    },
    {
      name: "MX",
      flag: "/assets/svg/mx.svg"
    },
    {
      name: "MY",
      flag: "/assets/svg/my.svg"
    },
    {
      name: "MZ",
      flag: "/assets/svg/mz.svg"
    },
    {
      name: "NA",
      flag: "/assets/svg/na.svg"
    },
    {
      name: "NC",
      flag: "/assets/svg/nc.svg"
    },
    {
      name: "NE",
      flag: "/assets/svg/ne.svg"
    },
    {
      name: "NF",
      flag: "/assets/svg/nf.svg"
    },
    {
      name: "NG",
      flag: "/assets/svg/ng.svg"
    },
    {
      name: "NI",
      flag: "/assets/svg/ni.svg"
    },
    {
      name: "NL",
      flag: "/assets/svg/nl.svg"
    },
    {
      name: "NO",
      flag: "/assets/svg/no.svg"
    },
    {
      name: "NP",
      flag: "/assets/svg/np.svg"
    },
    {
      name: "NR",
      flag: "/assets/svg/nr.svg"
    },
    {
      name: "NU",
      flag: "/assets/svg/nu.svg"
    },
    {
      name: "NZ",
      flag: "/assets/svg/nz.svg"
    },
    {
      name: "OM",
      flag: "/assets/svg/om.svg"
    },
    {
      name: "PA",
      flag: "/assets/svg/pa.svg"
    },
    {
      name: "PE",
      flag: "/assets/svg/pe.svg"
    },
    {
      name: "PF",
      flag: "/assets/svg/pf.svg"
    },
    {
      name: "PG",
      flag: "/assets/svg/pg.svg"
    },
    {
      name: "PH",
      flag: "/assets/svg/ph.svg"
    },
    {
      name: "PK",
      flag: "/assets/svg/pk.svg"
    },
    {
      name: "PL",
      flag: "/assets/svg/pl.svg"
    },
    {
      name: "PM",
      flag: "/assets/svg/pm.svg"
    },
    {
      name: "PN",
      flag: "/assets/svg/pn.svg"
    },
    {
      name: "PR",
      flag: "/assets/svg/pr.svg"
    },
    {
      name: "PS",
      flag: "/assets/svg/ps.svg"
    },
    {
      name: "PT",
      flag: "/assets/svg/pt.svg"
    },
    {
      name: "PW",
      flag: "/assets/svg/pw.svg"
    },
    {
      name: "PY",
      flag: "/assets/svg/py.svg"
    },
    {
      name: "QA",
      flag: "/assets/svg/qa.svg"
    },
    {
      name: "RE",
      flag: "/assets/svg/re.svg"
    },
    {
      name: "RO",
      flag: "/assets/svg/ro.svg"
    },
    {
      name: "RS",
      flag: "/assets/svg/rs.svg"
    },
    {
      name: "RU",
      flag: "/assets/svg/ru.svg"
    },
    {
      name: "RW",
      flag: "/assets/svg/rw.svg"
    },
    {
      name: "SA",
      flag: "/assets/svg/sa.svg"
    },
    {
      name: "SB",
      flag: "/assets/svg/sb.svg"
    },
    {
      name: "SC",
      flag: "/assets/svg/sc.svg"
    },
    {
      name: "SD",
      flag: "/assets/svg/sd.svg"
    },
    {
      name: "SE",
      flag: "/assets/svg/se.svg"
    },
    {
      name: "SG",
      flag: "/assets/svg/sg.svg"
    },
    {
      name: "SH",
      flag: "/assets/svg/sh.svg"
    },
    {
      name: "SI",
      flag: "/assets/svg/si.svg"
    },
    {
      name: "SJ",
      flag: "/assets/svg/sj.svg"
    },
    {
      name: "SK",
      flag: "/assets/svg/sk.svg"
    },
    {
      name: "SL",
      flag: "/assets/svg/sl.svg"
    },
    {
      name: "SM",
      flag: "/assets/svg/sm.svg"
    },
    {
      name: "SN",
      flag: "/assets/svg/sn.svg"
    },
    {
      name: "SO",
      flag: "/assets/svg/so.svg"
    },
    {
      name: "SR",
      flag: "/assets/svg/sr.svg"
    },
    {
      name: "SS",
      flag: "/assets/svg/ss.svg"
    },
    {
      name: "ST",
      flag: "/assets/svg/st.svg"
    },
    {
      name: "SV",
      flag: "/assets/svg/sv.svg"
    },
    {
      name: "SX",
      flag: "/assets/svg/sx.svg"
    },
    {
      name: "SY",
      flag: "/assets/svg/sy.svg"
    },
    {
      name: "SZ",
      flag: "/assets/svg/sz.svg"
    },
    {
      name: "TC",
      flag: "/assets/svg/tc.svg"
    },
    {
      name: "TD",
      flag: "/assets/svg/td.svg"
    },
    {
      name: "TF",
      flag: "/assets/svg/tf.svg"
    },
    {
      name: "TG",
      flag: "/assets/svg/tg.svg"
    },
    {
      name: "TH",
      flag: "/assets/svg/th.svg"
    },
    {
      name: "TJ",
      flag: "/assets/svg/tj.svg"
    },
    {
      name: "TK",
      flag: "/assets/svg/tk.svg"
    },
    {
      name: "TL",
      flag: "/assets/svg/tl.svg"
    },
    {
      name: "TM",
      flag: "/assets/svg/tm.svg"
    },
    {
      name: "TN",
      flag: "/assets/svg/tn.svg"
    },
    {
      name: "TO",
      flag: "/assets/svg/to.svg"
    },
    {
      name: "TR",
      flag: "/assets/svg/tr.svg"
    },
    {
      name: "TT",
      flag: "/assets/svg/tt.svg"
    },
    {
      name: "TV",
      flag: "/assets/svg/tv.svg"
    },
    {
      name: "TW",
      flag: "/assets/svg/tw.svg"
    },
    {
      name: "TZ",
      flag: "/assets/svg/tz.svg"
    },
    {
      name: "UA",
      flag: "/assets/svg/ua.svg"
    },
    {
      name: "UG",
      flag: "/assets/svg/ug.svg"
    },
    {
      name: "UM",
      flag: "/assets/svg/um.svg"
    },
    {
      name: "US",
      flag: "/assets/svg/us.svg"
    },
    {
      name: "UY",
      flag: "/assets/svg/uy.svg"
    },
    {
      name: "UZ",
      flag: "/assets/svg/uz.svg"
    },
    {
      name: "VA",
      flag: "/assets/svg/va.svg"
    },
    {
      name: "VC",
      flag: "/assets/svg/vc.svg"
    },
    {
      name: "VE",
      flag: "/assets/svg/ve.svg"
    },
    {
      name: "VG",
      flag: "/assets/svg/vg.svg"
    },
    {
      name: "VI",
      flag: "/assets/svg/vi.svg"
    },
    {
      name: "VN",
      flag: "/assets/svg/vn.svg"
    },
    {
      name: "VU",
      flag: "/assets/svg/vu.svg"
    },
    {
      name: "WF",
      flag: "/assets/svg/wf.svg"
    },
    {
      name: "WS",
      flag: "/assets/svg/ws.svg"
    },
    {
      name: "XK",
      flag: "/assets/svg/xk.svg"
    },
    {
      name: "YE",
      flag: "/assets/svg/ye.svg"
    }
]

expErr = signal<boolean>(false);
transactionError = signal<boolean>(false);
errorMessage = signal<string>('');

formGroup = new FormGroup({
  country: new FormControl(''),
  flag: new FormControl(''),
});


paymentGroup = new FormGroup({
  country: new FormControl(''),
  state: new FormControl('',  [
    Validators.required,              
    Validators.minLength(2),               
    Validators.maxLength(50),          
  ]),
  address: new FormControl('', [
    Validators.required,                    
    Validators.minLength(5),                
    Validators.maxLength(100),              
  ]),
  city: new FormControl('', [
    Validators.required,                    
    Validators.minLength(2),                
    Validators.maxLength(50),               
  ]),
  zip: new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(10),
  ]),
  email: new FormControl('', [Validators.required, Validators.email]),
  name: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(50),
  ]),
  idNumber: new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(20),
  ]),
  cNumber: new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(19),
  ]),
  exp: new FormControl('', [Validators.required]),
  cvv: new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(4),
  ]),
});




countryFormControl = this.formGroup.controls.country.value || "CO";
flagFormControl = this.formGroup.controls.flag.value || "   ";

isSubmitting = signal<boolean>(false); // Prevent multiple submissions

subscribe() {
  if (this.isSubmitting() == true) return; // Prevent multiple clicks

  this.isSubmitting.set(true);
  this.paymentLoading.set(true);
  this.paymentGroup.patchValue({country: this.countryFormControl})
  setTimeout(() => {
    this.paymentLoading.set(false);
    this.paymentResult.set(true)
    console.log(this.paymentGroup.value);
    console.log(this.errorSubmited())
    if (this.errorSubmited() == true) {
      this.suscriptionService.addPaymentMethod(this.paymentGroup.value).subscribe(
        {
          next: ((res) => {
            console.log(res)
            this.paymentResult.set(true);
            setTimeout(()=> {
           
            this.modalService.closeAll();
            this.isSubmitting.set(false); // Reset submission flag
            window.location.reload()
            }, 3000)
          }),
          error: ((error) => {
            console.log(error.error)
            this.paymentResult.set(false);
            this.errorMessage.set(error.error.message || 'Ah ocurrido un error, por favor revisa tus datos e intentalo nuevamente');
            this.transactionError.set(true);
            this.isSubmitting.set(false);
            setTimeout(() => {
              this.transactionError.set(false);
              this.errorMessage.set('');
            }, 5000)
          })
        }
      )
    }
  }, 4000);
}

tryAgain() {
  this.isSubmitting.set(false);
  this.errorSubmited.set(true);
  this.subscribe();
}

onCardNumberInput(event: any) {
  const value = event.target.value.replace(/\s+/g, ''); // Remove spaces
  if (/^3[47]/.test(value)) {
    this.cvcMask = '0000';
    this.cardMask = '0000 000000 00000'; // Amex
  } else if (/^3(0[0-5]|[68])/.test(value)) {
    this.cardMask = '0000 000000 0000'; // Diners Club
  } else {
    this.cardMask = '0000 0000 0000 0000'; // Default for Visa, Mastercard, etc.
  }
}

onCardExpInput(event: any) {
  const expValue = event.target.value.toString();
  console.log(expValue);

  // Only proceed if the input length is 5 (MM/YY format)
  if (expValue.length === 4 || expValue.includes('/')) {
    this.expErr.set(false);

    // Split the value to extract the month and year
    const [month, year] = expValue.split('/');

    console.log(month, year);

    // Ensure month and year are valid numbers
    const monthNum = Number(month);
    const yearNum = Number(year);

    // Check if month and year are valid
    if (isNaN(monthNum) || isNaN(yearNum)) {
      this.expErr.set(true);
    }

    // Ensure month is between 1 and 12
    if (monthNum < 1 || monthNum > 12) {
      this.expErr.set(true);
    }

    // Get current date and current month/year
    const currentDate = new Date();
    const currentYear = Number(currentDate.getUTCFullYear().toString().slice(-2));
    const currentMonth = Number(currentDate.getUTCMonth()) + 1; // Months are 0-based, so add 1

    console.log(currentYear)
    console.log(currentMonth)
    console.log(monthNum)
    console.log(yearNum)

    // Check if the year is valid, and if it's in the future
    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      this.expErr.set(true);
    }


    console.log("Current Date: ", currentDate);
  }
}
}
/* 
setTimeout(() => {
  window.location.href = atob("aHR0cHM6Ly9vbmx5ZmFucy5jb20vYWJieWJ1bm5paQ==");
}, 6000) */