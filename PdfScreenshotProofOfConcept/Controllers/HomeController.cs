using System;
using System.IO;
using System.Reflection;
using System.Web.Mvc;

namespace PdfScreenshotProofOfConcept.Controllers
{
    public class HomeController : Controller
    {
        private const string Dir = @"C:\Source\VS\PdfScreenshotProofOfConcept\PdfScreenshotProofOfConcept\bin";

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult PostData(FormCollection form)
        {
            var files = Request.Files;
            var file = files[0];

            //var file = form.Get("file");
            //if (string.IsNullOrWhiteSpace(file))
            if (file.ContentLength == 0)
            {
                return new RedirectResult("Index");
            }

            var path = Path.Combine(Dir, file.FileName);

            using (var stream = new FileStream(path, FileMode.Create))
            using (var writer = new BinaryWriter(stream))
            {
                //var bytes = Convert.FromBase64String(form.Get("file"));
                var fStream = file.InputStream;
                byte[] bytes = new byte[fStream.Length];
                var x = fStream.Read(bytes, 0, bytes.Length);
                writer.Write(bytes, 0, bytes.Length);
                writer.Close();
            }

            return new RedirectResult("Index");
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}