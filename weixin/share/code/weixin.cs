using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Xml.Linq;
using Senparc.Weixin.MP.Entities.Request;
using Senparc.Weixin.MP.MvcExtension;
using Senparc.Weixin.MP;
using ECash.Commlib;
using Newtonsoft.Json;

namespace ECash.Controllers
{
    public class WeiXinController : Controller
    {

        public ContentResult JSSDK(string url, string callback)
        {
           // BugLog.Write(url);
            var jssdk = JsonConvert.SerializeObject(WXJSSDKHelper.GetJsSdkUiPackage(url));
            
            return Content(callback+"("+jssdk+")");
        }

    }

    public class WXJSSDKHelper
    {
        /// <summary>
        /// ��ȡ��UIʹ�õ�JSSDK��Ϣ��
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        public static JsSdkUiPackage GetJsSdkUiPackage(string url)
        {
            string appId = System.Web.Configuration.WebConfigurationManager.AppSettings["WeixinAppId"];
            
            string timestamp = JSSDKHelper.GetTimestamp();
            //��ȡ�����
            string nonceStr = JSSDKHelper.GetNoncestr();
            
            string ticket = CommonMicroModels.GetTicket("Ticket");
            //��ȡǩ��
            string signature = JSSDKHelper.GetSignature(ticket, nonceStr, timestamp, url);

            return new JsSdkUiPackage { AppId=appId, Timestamp = timestamp, NonceStr=nonceStr, Signature=signature };
        }
    }

}
