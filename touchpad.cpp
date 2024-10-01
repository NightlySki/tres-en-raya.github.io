#include <SDL.h>
#include <iostream>

int main(int argc, char* argv[]) {
    if (SDL_Init(SDL_INIT_VIDEO | SDL_INIT_GAMECONTROLLER) != 0) {
        std::cerr << "Error initializing SDL: " << SDL_GetError() << std::endl;
        return 1;
    }

    SDL_GameController* controller = nullptr;

    // Buscar y abrir el controlador DualSense
    for (int i = 0; i < SDL_NumJoysticks(); ++i) {
        if (SDL_IsGameController(i)) {
            controller = SDL_GameControllerOpen(i);
            if (controller) {
                std::cout << "Controller connected: " << SDL_GameControllerName(controller) << std::endl;
                break;
            }
        }
    }

    if (!controller) {
        std::cerr << "No controller found!" << std::endl;
        SDL_Quit();
        return 1;
    }

    SDL_Event event;
    bool running = true;
    int mouseX = 0, mouseY = 0;
    
    // Loop de eventos
    while (running) {
        while (SDL_PollEvent(&event)) {
            if (event.type == SDL_QUIT) {
                running = false;
            } else if (event.type == SDL_CONTROLLERTOUCHPADMOTION)​⬤