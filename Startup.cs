using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

public class Startup
{
    // Configuración de servicios
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddSignalR(); // Agregar SignalR al contenedor de servicios
    }

    // Configuración de la aplicación
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage(); // Página de errores en desarrollo
        }
        else
        {
            app.UseExceptionHandler("/Home/Error"); // Página de errores en producción
            app.UseHsts(); // Recomendación de seguridad para HTTP
        }

        app.UseHttpsRedirection(); // Redirigir HTTP a HTTPS
        app.UseStaticFiles(); // Servir archivos estáticos

        app.UseRouting(); // Habilitar el enrutamiento

        app.UseAuthorization(); // Habilitar autorización

        // Configuración de las rutas
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapHub<PanelTactil>("/paneltactil"); // Ruta para el Hub de SignalR
            endpoints.MapControllers(); // Si tienes controladores
            // endpoints.MapDefaultControllerRoute(); // Descomentar si usas MVC
        });
    }
}
