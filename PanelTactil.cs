using System;
using SharpDX.DirectInput;

public class PanelTactil
{
    private DirectInput directInput;
    private Joystick joystick;

    public PanelTactil()
    {
        directInput = new DirectInput();
        foreach (var device in directInput.GetDevices(DeviceType.Joystick, DeviceEnumerationFlags.AllDevices))
        {
            joystick = new Joystick(directInput, device.InstanceGuid);
            break; // Usar solo el primer gamepad encontrado
        }

        joystick.SetCooperativeLevel(new IntPtr(0), CooperativeLevel.Background | CooperativeLevel.NonExclusive);
        joystick.Acquire();
    }

    public void Update()
    {
        joystick.Poll();
        var state = joystick.GetCurrentState();

        // Aquí puedes manejar los eventos del touchpad
        // Por ejemplo, puedes enviar las coordenadas al frontend
        Console.WriteLine($"Touchpad: {state.X}, {state.Y}");
    }
}
